import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IItemCart } from '../../../../domain/models/interfaces/Iproduct';
import { CartService } from '../../../../infraestructure/cart/cart-service.service';
import { AuthenticationState } from '../../../../security/Auth/authentication-state';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import {  ITemporalOrderDTO } from '../../../../domain/models/interfaces/IOrder';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent  {
  user?:AuthenticationState;
  @Input() item!: IItemCart;
  @Input() tableId!: string;
  @Input() isAnonimous:boolean=true;
  @Output() chartChange = new EventEmitter<void>();

  constructor(private cartService: CartService,private service:GenericService) {}

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
      this.chartChange.emit();
    });

  }

  incrementCount() {
    if(this.isAnonimous){
      this.cartService.updateItemCount(this.item.productId, this.item.quantity + 1);
      return;
    }
    this.actionChart(1);
  }

  decrementCount() {
    if(this.isAnonimous){
      if (this.item.quantity > 1) {
        this.cartService.updateItemCount(this.item.productId, this.item.quantity - 1);
        return;
      }
      return;
    }
    this.actionChart(-1);
  }
  actionChart(num:number){
    var temporalOrder:ITemporalOrderDTO={tableId:this.tableId,productId:this.item.productId,quantity:num}
    this.service.post<ITemporalOrderDTO,ITemporalOrderDTO>(temporalOrder,"temporalOrders/full").subscribe(data=>{
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      this.chartChange.emit();
    });
  }

}

