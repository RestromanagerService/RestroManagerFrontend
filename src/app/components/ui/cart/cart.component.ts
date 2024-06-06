import { Component, OnInit } from '@angular/core';
import { IItemCart } from '../../../domain/models/interfaces/Iproduct';
import { CartService } from '../../shared/navbar/cart-icon/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: IItemCart[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items: IItemCart[]) => {
      this.items = items;
    });
  }
}
