import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../domain/models/interfaces/Iproduct';
import { CartService } from '../../../shared/navbar/cart-icon/cart-service.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct;
  quantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.validatePhoto();
  }

  validatePhoto() {
    if (this.product.photo === "") {
      this.product.photo = "https://cdn.inoutdelivery.com/hotamericas.inoutdelivery.com.co/xl/1641566456602-pastas_spaghetti-a-la-bolagnesa.webp";
    }
  }

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
      this.cartService.addItemToCart({name:this.product.name, id: this.product.id, count: this.quantity, value: this.product.productionCost, photo: this.product.photo });
      this.quantity = 0;
    }
  }
}
