import { Component, Input, OnInit } from '@angular/core';
import { IItemCart } from '../../../../domain/models/interfaces/Iproduct';
import { CartService } from '../../../shared/navbar/cart-icon/cart-service.service';
import { AuthenticatorJWTService } from '../../../../security/Auth/authenticator-jwt.service';
import { AuthenticationState } from '../../../../security/Auth/authentication-state';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { ToastManager } from '../../../shared/alerts/toast-manager';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item!: IItemCart;
  user?:AuthenticationState;
  isAnonimous:boolean=true;

  constructor(private cartService: CartService,private authenticator:AuthenticatorJWTService, private service:GenericService) {}
  ngOnInit(): void {
    this.authenticator.getAuthenticationState().subscribe((authState) => {
      this.user = authState;
      this.isAnonimous=(this.user.role=="anonimous")?true:false;
    });
  }

  removeItem() {
    if(this.isAnonimous){
      this.cartService.removeItemFromCart(this.item.productId);
      return;
    }
    this.service.delete(this.item.id!,"temporalOrders/").subscribe(data=>{
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
    });

  }

  incrementCount() {
    this.cartService.updateItemCount(this.item.productId, this.item.quantity + 1);
  }

  decrementCount() {
    if (this.item.quantity > 1) {
      this.cartService.updateItemCount(this.item.productId, this.item.quantity - 1);
    }
  }

}

