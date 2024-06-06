import { Component } from '@angular/core';
import { IItemCart } from '../../../domain/models/interfaces/Iproduct';

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.css']
})
export class GetOrderComponent {
  orderId: string = '';
  orderStatus: string = '';
  orderDetails: IItemCart[] = [];

  getOrderDetails() {
    const orderData = localStorage.getItem(`order_${this.orderId}`);
    if (orderData) {
      const order = JSON.parse(orderData);
      this.orderDetails = order.items;
      this.orderStatus = order.status;
    } else {
      this.orderDetails = [];
      this.orderStatus = 'No encontrada';
    }
  }
}
