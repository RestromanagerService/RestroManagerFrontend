import { Component, OnInit } from '@angular/core';
import { IItemCart } from '../../../domain/models/interfaces/Iproduct';
import { CartService } from '../../shared/navbar/cart-icon/cart-service.service';
import { AuthenticatorJWTService } from '../../../security/Auth/authenticator-jwt.service';
import { AuthenticationState } from '../../../security/Auth/authentication-state';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import { ToastManager } from '../../shared/alerts/toast-manager';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: IItemCart[] = [];
  user?:AuthenticationState;

  constructor(private cartService: CartService,private authenticator:AuthenticatorJWTService,private service:GenericService) {}

  ngOnInit(): void {
    this.authenticator.getAuthenticationState().subscribe((authState) => {
      this.user = authState;
      if(this.user.role=="anonimous"){
        this.cartService.cartItems$.subscribe((items: IItemCart[]) => {
          this.items = items;
        });
        return;
      }
      this.service.getAll<IItemCart>("temporalOrders/my").subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        this.items=data.getResponse()!;
        console.log(this.items);
      });
    });
    
  }
}
