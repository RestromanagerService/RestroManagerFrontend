import { Component, OnInit, ViewChild } from '@angular/core';
import { IItemCart } from '../../../domain/models/interfaces/Iproduct';
import { CartService } from '../../shared/navbar/cart-icon/cart-service.service';
import { AuthenticatorJWTService } from '../../../security/Auth/authenticator-jwt.service';
import { AuthenticationState } from '../../../security/Auth/authentication-state';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import { ToastManager } from '../../shared/alerts/toast-manager';
import { ITable } from '../../../domain/models/interfaces/IOrder';
import { LocalStorageService } from '../../../security/helper/local-storage.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private ORDER_TABLE: string = "ORDER_TABLE";
  items: IItemCart[] = [];
  user?:AuthenticationState;
  isAnonimous:boolean=true;
  table?:ITable;

  constructor(private cartService: CartService,private authenticator:AuthenticatorJWTService,private service:GenericService,private localStorage:LocalStorageService) {}

  ngOnInit(): void {
    this.localStorage.getItem(this.ORDER_TABLE).subscribe(table=>{
      if(table!=""){
        this.service.getById<ITable>("tables/",table).subscribe(resp=>{
          if(resp.getError()){
            this.localStorage.removeItem(this.ORDER_TABLE).subscribe();
            return;
          }
          this.table=resp.getResponse();
        })
      }
      this.authenticator.getAuthenticationState().subscribe((authState) => {
        this.user = authState;
        if(this.user.role=="anonimous"){
          this.cartService.cartItems$.subscribe((items: IItemCart[]) => {
            this.items = items;
          });
          return;
        }
        this.isAnonimous=false;
        this.service.getAll<IItemCart>("temporalOrders/my").subscribe(data=>{
          if(data.getError()){
            ToastManager.showToastError(data.getResponseMessage());
            return;
          }
          this.items=data.getResponse()!;
        });
      });
    }); 
  }
  chartChange(){
    this.ngOnInit();
  }
}
