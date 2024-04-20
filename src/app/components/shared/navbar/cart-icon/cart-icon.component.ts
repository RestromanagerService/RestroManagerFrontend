import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrl: './cart-icon.component.css'
})
export class CartIconComponent {
  get itemCount(){
    return 1;
  }
}
