import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from '../../../../domain/models/interfaces/IOrder';
import { HttpParams } from '@angular/common/http';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';

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

  constructor(private genericService: GenericService, private router: Router) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const params = new HttpParams()
      .set('status', '1')  // Estado "Preparado"
      .set('page', this.page.toString())
      .set('pageSize', this.pageSize.toString());

    this.genericService.getAll<IOrder>('Orders/status', params)
      .subscribe((response: HttpResponseWrapper<IOrder[]>) => {
        this.orders = response.getResponse()!;
        this.hasMoreOrders = this.orders.length === this.pageSize;
      });
  }

  changeStatusToDelivered(orderId: number): void {
    const payload = { orderStatus: 2 }; // Estado "Entregado"

    this.genericService.patch<any>(`Orders/${orderId}/status`, payload)
      .subscribe((response: HttpResponseWrapper<any>) => {
        this.loadOrders()
      });
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
