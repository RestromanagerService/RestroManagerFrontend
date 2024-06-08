import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart-service.service';
import { Subscription } from 'rxjs';
import { AuthenticationState } from '../../../../security/Auth/authentication-state';
import { AuthenticatorJWTService } from '../../../../security/Auth/authenticator-jwt.service';
import { IItemCart } from '../../../../domain/models/interfaces/Iproduct';
import { ToastManager } from '../../alerts/toast-manager';
import { GenericService } from '../../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {
  itemCount: number = 0;
  private subscription!: Subscription;
  user?:AuthenticationState;
  isAnonimous:boolean=true;
  items: IItemCart[] = [];
  totalQuantity: number = 0;

  constructor(private cartService: CartService, private authenticator:AuthenticatorJWTService,private service:GenericService) {}

  ngOnInit(): void {
    this.authenticator.getAuthenticationState().subscribe((authState) => {
      this.user = authState;
      if(this.user.role=="anonimous"){
        this.cartService.cartItems$.subscribe((items: IItemCart[]) => {
          this.items = items;
          this.itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
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
        this.itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
      });
    });
  }
}
