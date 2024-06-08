import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IItemCart, IProduct } from '../../../../domain/models/interfaces/Iproduct';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { AuthenticatorJWTService } from '../../../../security/Auth/authenticator-jwt.service';
import { LocalStorageService } from '../../../../security/helper/local-storage.service';
import { ITable, ITemporalOrderDTO } from '../../../../domain/models/interfaces/IOrder';
import { TableIndicatorComponent } from '../../../shared/table-indicator/table-indicator.component';
import { AuthenticationState } from '../../../../security/Auth/authentication-state';
import { CartService } from '../../../../infraestructure/cart/cart-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private URL_REQUEST: string = "Products/";
  private ORDER_TABLE: string = "ORDER_TABLE";
  product!: IProduct;
  quantity: number = 1;
  table?:ITable;
  user?:AuthenticationState;
  @ViewChild('indicator') tableIndicator!: TableIndicatorComponent;

  constructor(
    private route: ActivatedRoute,
    private service: GenericService,
    private authenticator:AuthenticatorJWTService,
    private localStorage: LocalStorageService,
    private cartService:CartService,
    private _router:Router

  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id')!;
    this.getProductDetails(productId);
    this.localStorage.getItem(this.ORDER_TABLE).subscribe(table=>{
      if(table!=""){
        this.service.getById<ITable>("tables/",table).subscribe(resp=>{
          if(resp.getError()){
            this.localStorage.removeItem(this.ORDER_TABLE).subscribe();
            return;
          }
          this.table=resp.getResponse();
        })
      }
      this.authenticator.getAuthenticationState().subscribe((authState) => {
        this.user = authState;
      });
    });
  }


  getProductDetails(productId: string): void {
    this.service.getById<IProduct>(this.URL_REQUEST, productId).subscribe(data=>{
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        this._router.navigate(["/products"]);
        return;
      }
      this.product = data.getResponse()!;
    });
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
      if(this.table==undefined){
        this.tableIndicator.openModal();
        return;
      }
      if(this.user?.role=="anonimous"){
        const item:IItemCart={productId:this.product.id,product:this.product,quantity:this.quantity}
        this.cartService.addItemToCart(item);
        return;
      }
      var temporalOrder:ITemporalOrderDTO={tableId:this.table.id,productId:this.product.id,quantity:this.quantity}
      this.service.post<ITemporalOrderDTO,ITemporalOrderDTO>(temporalOrder,"temporalOrders/full").subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError("No se pudo agregar el producto");
          return;
        }
        ToastManager.showToastSuccess("Producto agregado");
      });
    }
  }

}
