import { Component, Input } from '@angular/core';
import { IItemCart } from '../../../../domain/models/interfaces/Iproduct';
import { CartService } from '../../../shared/navbar/cart-icon/cart-service.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item!: IItemCart;

  constructor(private cartService: CartService) {}

  removeItem() {
    this.cartService.removeItemFromCart(this.item.productId);
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

