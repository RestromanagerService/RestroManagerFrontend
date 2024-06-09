import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItemCart } from '../../domain/models/interfaces/Iproduct';
import { IOrder, ITable } from '../../domain/models/interfaces/IOrder';
import { AuthenticatorJWTService } from '../../security/Auth/authenticator-jwt.service';
import { LocalStorageService } from '../../security/helper/local-storage.service';
import { GenericService } from '../generic/generic-service';
import { ToastManager } from '../../components/shared/alerts/toast-manager';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'shopping_cart';
  private lastOrderIdKey = 'last_order_id';
  private ORDER_TABLE: string = "ORDER_TABLE";
  private cartLifetime = 10 * 60 * 1000;
  private itemCountSubject = new BehaviorSubject<number>(this.getItemCount());
  private cartItemsSubject = new BehaviorSubject<IItemCart[]>(this.getCartItems());

  itemCount$ = this.itemCountSubject.asObservable();
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private authenticator:AuthenticatorJWTService) {
    this.checkAndRemoveExpiredCart();
  }

  private getCartData() {
    const cartData = localStorage.getItem(this.cartKey);
    if (cartData) {
      const parsedData = JSON.parse(cartData);
      if (this.isCartExpired(parsedData)) {
        localStorage.removeItem(this.cartKey);
        return null;
      }
      return parsedData;
    }
    return null;
  }

  private saveCartData(cartData: any) {
    localStorage.setItem(this.cartKey, JSON.stringify(cartData));
    this.itemCountSubject.next(this.getItemCount());
    this.cartItemsSubject.next(cartData.items);
  }

  private isCartExpired(cartData: any): boolean {
    const now = Date.now();
    return now > cartData.time_stamp_end;
  }

  private initializeCart() {
    const now = Date.now();
    return {
      items: [],
      time_stamp_begin: now,
      time_stamp_end: now + this.cartLifetime
    };
  }

  public clearCart() {
    const cartData = this.initializeCart();
    this.saveCartData(cartData);
  }

  private updateCartTimestamp(cartData: any) {
    const now = Date.now();
    cartData.time_stamp_begin = now;
    cartData.time_stamp_end = now + this.cartLifetime;
  }

  private generateOrderId(): number {
    let lastOrderId = parseInt(localStorage.getItem(this.lastOrderIdKey) || '0', 10);
    if (isNaN(lastOrderId)) {
      lastOrderId = 0;
    }
    lastOrderId += 1;
    localStorage.setItem(this.lastOrderIdKey, lastOrderId.toString());
    return lastOrderId;
  }
  
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

  public saveOrderAndClearCart(): number {
    const cartData = this.getCartData();
    if (cartData && cartData.items && cartData.items.length > 0) {
      const orderId = this.generateOrderId();
      const orderStatus = 'Nuevo';
      const now = new Date();
      const order: IOrder = {
        id: orderId,
        items: cartData.items,
        status: orderStatus,
        datetimeBegin: this.formatDate(now),
        datetimeUpdate: this.formatDate(now),
        tableId: this.ORDER_TABLE
      };
      localStorage.setItem(`order_${orderId}`, JSON.stringify(order));
      this.clearCart();
      return orderId;
    }
    return -1;
  }
  


  getCartItems(): IItemCart[] {
    let cartData = this.getCartData();
    if (!cartData) {
      cartData = this.initializeCart();
      this.saveCartData(cartData);
    }
    return cartData.items;
  }

  addItemToCart(item: IItemCart) {
    let cartData = this.getCartData();
    if (!cartData) {
      cartData = this.initializeCart();
    } else {
      this.updateCartTimestamp(cartData);
    }
    const existingItem:IItemCart  = cartData.items.find((i: IItemCart) => i.productId === item.productId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.value=existingItem.quantity*existingItem.product?.price!;
    } else {
      item.value=item.quantity*item.product?.price!;
      cartData.items.push(item);
    }
    this.saveCartData(cartData);
    ToastManager.showToastSuccess("Producto agregado");
  }

  removeItemFromCart(itemId: string) {
    const cartData = this.getCartData();
    if (cartData) {
      cartData.items = cartData.items.filter((item: IItemCart) => item.productId !== itemId);
      this.saveCartData(cartData);
    }
  }
  updateItemCount(itemId: string, count: number) {
    const cartData = this.getCartData();
    if (cartData) {
      const item:IItemCart = cartData.items.find((i: IItemCart) => i.productId === itemId);
      if (item) {
        item.quantity = count;
        item.value=item.quantity*item.product?.price!;
      }
      this.saveCartData(cartData);
    }
  }
  getItemCount(): number {
    const items = this.getCartItems();
    return items.reduce((total: number, item: IItemCart) => total += item.quantity, 0);
  }

  private checkAndRemoveExpiredCart() {
    const cartData = this.getCartData();
    if (cartData && this.isCartExpired(cartData)) {
      localStorage.removeItem(this.cartKey);
    }
  }
}
