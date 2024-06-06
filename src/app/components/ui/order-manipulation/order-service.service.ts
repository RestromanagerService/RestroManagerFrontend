import { Injectable } from '@angular/core';
import { IOrder } from '../../../domain/models/interfaces/IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private lastOrderIdKey = 'last_order_id';
  private ordersKeyPrefix = 'order_';

  constructor() {}

  private formatDate(date: Date): string {
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  getOrderById(orderId: number): IOrder | null {
    const order = localStorage.getItem(`${this.ordersKeyPrefix}${orderId}`);
    return order ? JSON.parse(order) : null;
  }

  updateOrderStatus(orderId: number, status: string): void {
    const order = this.getOrderById(orderId);
    if (order) {
      order.status = status;
      order.datetimeUpdate = this.formatDate(new Date());
      localStorage.setItem(`${this.ordersKeyPrefix}${orderId}`, JSON.stringify(order));
    }
  }

  getOrders(status: string, page: number, pageSize: number): { orders: IOrder[], hasMoreOrders: boolean } {
    const orders: IOrder[] = [];
    for (let i = 1; i <= parseInt(localStorage.getItem(this.lastOrderIdKey) || '0', 10); i++) {
      const order = this.getOrderById(i);
      if (order && order.status === status) {
        orders.push(order);
      }
    }
    const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize);
    return {
      orders: paginatedOrders,
      hasMoreOrders: orders.length > page * pageSize
    };
  }
}
