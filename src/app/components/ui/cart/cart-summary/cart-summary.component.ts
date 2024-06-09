import { Component, Input } from '@angular/core';
import { IItemCart } from '../../../../domain/models/interfaces/Iproduct';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { CartService } from '../../../../infraestructure/cart/cart-service.service';
import { AuthenticatorJWTService } from '../../../../security/Auth/authenticator-jwt.service';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { AuthenticationState } from '../../../../security/Auth/authentication-state';
import { IOrder, IOrderDTO, ITable, ITemporalOrderDTO } from '../../../../domain/models/interfaces/IOrder';
import { LocalStorageService } from '../../../../security/helper/local-storage.service';
import { EMPTY, catchError, mapTo, of, switchMap, tap, timeout } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {
  @Input() items: IItemCart[] =[];
  user? : AuthenticationState;
  private ORDER_TABLE: string = "ORDER_TABLE";
  tableId!: string;

  constructor(private cartService: CartService, 
    private authenticator:AuthenticatorJWTService, 
    private genericService:GenericService,
    private localStorage:LocalStorageService,
    private _router: Router
  ) {}

  getTotalCost(): number {
    return this.items.reduce((total, item) => total + (item.product?.price ?? 0) * item.quantity, 0);
  }
  
  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  continuePurchase() {
    this.localStorage.getItem(this.ORDER_TABLE).pipe(
      switchMap(table => {
        if (table) {
          return this.genericService.getById<ITable>("tables/", table).pipe(
            catchError(error => {
              this.localStorage.removeItem(this.ORDER_TABLE).subscribe();
              return EMPTY;
            }),
            tap(resp => {
              const response = resp?.getResponse();
              if (!resp || resp.getError() || !response) {
                this.localStorage.removeItem(this.ORDER_TABLE).subscribe();
                throw new Error('Respuesta invalida');
              }
              this.tableId = response.id;
            }),
            mapTo(table)  
          );
        } else {
          return of("");  
        }
      }),
      switchMap(() => this.authenticator.getAuthenticationState()),
      switchMap(authState => {
        this.user = authState;
        if (this.user.role === "anonymous") {
          return EMPTY;
        }
        const orderDTO: ITemporalOrderDTO = { tableId: this.tableId };
        return this.genericService.post<ITemporalOrderDTO, IOrderDTO>(orderDTO, "Orders");
      })
    ).subscribe(
      data => {
        if (data.getError()) {
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        ToastManager.showCenteredMessage("Se ha creado su orden satisfactoriamente","Se ha creado la orden con el ID: " + data.getResponse(),'success')
        this._router.navigate(['/']);
      },
      error => {
        ToastManager.showToastError("Ha sucedido un error inesperado");
      }
    );
  }
  
  
}
