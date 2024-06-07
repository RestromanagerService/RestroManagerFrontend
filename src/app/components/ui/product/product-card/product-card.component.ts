import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IItemCart, IProduct} from '../../../../domain/models/interfaces/Iproduct';
import { CartService } from '../../../shared/navbar/cart-icon/cart-service.service';
import { ITemporalOrder } from '../../../../domain/models/interfaces/IOrder';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
  @Input() product!: IProduct;
  @Output() addItemEvent = new EventEmitter<IItemCart>();
  quantity: number = 1;
  getProductTypeLabel(): string {
    switch (this.product.productType) {
      case 0:
        return 'Producto comercial';
      case 1:
        return 'Producto preparado';
      default:
        return 'Desconocido';
    }
  }

  incrementQuantity(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.quantity > 0) {
      this.addItemEvent.emit({productId:this.product.id,product:this.product,quantity:this.quantity});
      this.quantity = 1;
    }
  }
}
