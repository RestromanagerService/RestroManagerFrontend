import { Component, Input } from '@angular/core';
import { IItemCart } from '../../../../domain/models/interfaces/Iproduct';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { CartService } from '../../../../infraestructure/cart/cart-service.service';
import { AuthenticatorJWTService } from '../../../../security/Auth/authenticator-jwt.service';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { AuthenticationState } from '../../../../security/Auth/authentication-state';
import { IOrderDTO, ITable, ITemporalOrderDTO } from '../../../../domain/models/interfaces/IOrder';
import { LocalStorageService } from '../../../../security/helper/local-storage.service';
import { EMPTY, Observable, catchError, mapTo, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {
  @Input() items: IItemCart[] = [];
  user?: AuthenticationState;
  private ORDER_TABLE: string = "ORDER_TABLE";
  tableId!: string;

  constructor(
    private cartService: CartService,
    private authenticator: AuthenticatorJWTService,
    private genericService: GenericService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {
    this.authenticator.getAuthenticationState().subscribe(authState => {
      this.user = authState;
    });
  }

  getTotalCost(): number {
    return this.items.reduce((total, item) => total + (item.product?.price ?? 0) * item.quantity, 0);
  }

  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  handleTable(): Observable<string> {
    return this.localStorage.getItem(this.ORDER_TABLE).pipe(
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
                throw new Error('Respuesta inválida');
              }
              this.tableId = response.id;
            }),
            mapTo(table)
          );
        } else {
          return of("");
        }
      })
    );
  }

  continuePurchaseAnonymous() {
    this.handleTable().pipe(
      switchMap(() => this.localStorage.getItem("shopping_cart")),
      switchMap(cart => {
        const parsedCart = JSON.parse(cart);
        const temporalOrders = [];

        for (const item of parsedCart.items) {
          temporalOrders.push({
            ProductId: item.productId,
            Quantity: item.quantity,
            TableId: this.tableId,
            Value: item.value
          });
        }

        const orderDTO: ITemporalOrderDTO = {
          tableId: this.tableId,
          temporalOrders: temporalOrders
        };
        this.cartService.clearCart();
        return this.genericService.post<ITemporalOrderDTO, any>(orderDTO, "Annonymous");
      })
    ).subscribe(
      data => {
        if (data.getError()) {
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        ToastManager.showCenteredMessage("Se ha creado su orden satisfactoriamente", "Se ha creado la orden con el ID: " + data.getResponse(), 'success');
        this.router.navigate(['/']);
      },
      error => {
        ToastManager.showToastError("Ha sucedido un error inesperado");
      }
    );
  }

  continuePurchaseAuthenticated() {
    this.handleTable().pipe(
      switchMap(() => {
        const temporalOrders = this.items.map(item => ({
          ProductId: item.productId,
          Quantity: item.quantity,
          TableId: this.tableId
        }));

        const orderDTO: ITemporalOrderDTO = {
          tableId: this.tableId
        };
        return this.genericService.post<ITemporalOrderDTO, any>(orderDTO, "Orders");
      })
    ).subscribe(
      data => {
        if (data.getError()) {
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        ToastManager.showCenteredMessage("Se ha creado su orden satisfactoriamente", "Se ha creado la orden con el ID: " + data.getResponse(), 'success');
        this.router.navigate(['/']);
      },
      error => {
        ToastManager.showToastError("Ha sucedido un error inesperado");
      }
    );
  }
}
