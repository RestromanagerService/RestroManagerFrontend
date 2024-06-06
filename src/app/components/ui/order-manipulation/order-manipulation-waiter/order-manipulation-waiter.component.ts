import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order-service.service';
import { IOrder } from '../../../../domain/models/interfaces/IOrder';

@Component({
  selector: 'app-order-manipulation-waiter',
  templateUrl: './order-manipulation-waiter.component.html',
  styleUrls: ['./order-manipulation-waiter.component.css']
})
export class OrderManipulationWaiterComponent implements OnInit {
  orders: IOrder[] = [];
  page = 1;
  pageSize = 5;
  hasMoreOrders = true;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const data = this.orderService.getOrders('Preparado', this.page, this.pageSize);
    this.orders = data.orders;
    this.hasMoreOrders = data.hasMoreOrders;
  }

  changeStatusToDelivered(orderId: number): void {
    this.orderService.updateOrderStatus(orderId, 'Entregado');
    this.loadOrders();
  }

  viewOrderDetails(orderId: number): void {
    this.router.navigate(['/order-detail', orderId]);
  }

  nextPage(): void {
    this.page++;
    this.loadOrders();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadOrders();
    }
  }
}
