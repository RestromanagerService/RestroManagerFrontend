import { Component, Input } from '@angular/core';
import { IItemCart } from '../../../../domain/models/interfaces/Iproduct';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { CartService } from '../../../shared/navbar/cart-icon/cart-service.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent {
  @Input() items: IItemCart[] =[];

  constructor(private cartService: CartService) {}

  getTotalCost(): number {
    return this.items.reduce((total, item) => total + (item.product?.price ?? 0) * item.quantity, 0);
  }
  
  getTotalItems(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  continuePurchase() {
    const orderId = this.cartService.saveOrderAndClearCart();
    if (orderId !== -1) {
      ToastManager.showCenteredMessage('Orden Guardada', `Tu orden #${orderId} ha sido guardada exitosamente.`, 'success');
    } else {
      ToastManager.showCenteredMessage('Error', 'Hubo un problema al guardar tu orden. Inténtalo de nuevo.', 'error');
    }
  }
}
