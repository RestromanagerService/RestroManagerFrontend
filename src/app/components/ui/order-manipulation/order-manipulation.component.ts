import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../../../domain/models/interfaces/IOrder';
import { OrderService } from './order-service.service';

@Component({
  selector: 'app-order-manipulation',
  templateUrl: './order-manipulation.component.html',
  styleUrls: ['./order-manipulation.component.css']
})
export class OrderManipulationComponent implements OnInit {
  orders: IOrder[] = [];
  page = 1;
  pageSize = 5;
  hasMoreOrders = true;

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const data = this.orderService.getOrders('Nuevo', this.page, this.pageSize);
    this.orders = data.orders;
    this.hasMoreOrders = data.hasMoreOrders;
  }

  changeStatusToInProgress(orderId: number): void {
    this.orderService.updateOrderStatus(orderId, 'Preparado');
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
