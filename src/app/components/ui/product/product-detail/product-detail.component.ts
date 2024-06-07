import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../../domain/models/interfaces/Iproduct';
import { CartService } from '../../../shared/navbar/cart-icon/cart-service.service';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: IProduct;
  quantity: number = 1;
  private URL_REQUEST: string = "Products/";

  constructor(
    private route: ActivatedRoute,
    private genericService: GenericService,
    private cartService: CartService 
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id')!;
    this.getProductDetails(productId);
  }


  getProductDetails(productId: string): void {
    this.genericService.getById<IProduct>(this.URL_REQUEST, productId).subscribe(
      (response: HttpResponseWrapper<IProduct>) => {
        if (!response.getError()) {
          this.product = response.getResponse()!;
        } else {
          console.error('Error fetching product details:', response.getResponseMessage());
        }
      },
      (error: any) => {
        console.error('Error fetching product details', error);
      }
    );
  }

  getProductTypeLabel(productType: number): string {
    switch (productType) {
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
      //this.cartService.addItemToCart({
      //  id: this.product.id,
      //  name: this.product.name,
      //  count: this.quantity,
      //  value: this.product.productionCost,
      //  photo: this.product.photo
      //});
    }
  }
}
