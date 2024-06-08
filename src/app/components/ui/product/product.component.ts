import { Component, OnInit, ViewChild } from '@angular/core';
import { IItemCart, IProduct } from '../../../domain/models/interfaces/Iproduct';
import { BuildPagination } from '../../../domain/models/pagination';
import { ToastManager } from '../../shared/alerts/toast-manager';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import { LocalStorageService } from '../../../security/helper/local-storage.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ITable, ITemporalOrder, ITemporalOrderDTO } from '../../../domain/models/interfaces/IOrder';
import { CartService } from '../../shared/navbar/cart-icon/cart-service.service';
import { AuthenticatorJWTService } from '../../../security/Auth/authenticator-jwt.service';
import { AuthenticationState } from '../../../security/Auth/authentication-state';
import { TableIndicatorComponent } from '../../shared/table-indicator/table-indicator.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products!: IProduct[];
  private URL_REQUEST: string = "Products/";
  private ORDER_TABLE: string = "ORDER_TABLE";
  actualPage: number = 1;
  recordsNumber: number = 3;
  totalPages: number = 1;
  loading: boolean = true;
  valueSearch: string = '';
  pages: number[] = [];
  table?:ITable;
  user?:AuthenticationState;
  @ViewChild('indicator') tableIndicator!: TableIndicatorComponent;

  constructor(private service: GenericService,
    private localStorage: LocalStorageService,
    private cartService:CartService,
    private authenticator:AuthenticatorJWTService) {}

  ngOnInit(): void {
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
        this.fetchProducts();
      });
    });
  }

  fetchProducts(): void {
    this.loading = true;
    let pagination = BuildPagination.build('', this.recordsNumber, this.actualPage, this.valueSearch);
    this.service.getAll<IProduct>(this.URL_REQUEST, pagination)
      .subscribe(data => {
        if (data.getError()) {
          ToastManager.showToastError(data.getResponseMessage());
          this.resetVariables();
        } else {
          this.products = data.getResponse()!;
          if (this.products.length === 0) {
            ToastManager.showToastInfo("No hay registros por mostrar");
          }
          this.service.getTotalPages(this.URL_REQUEST, pagination)
            .subscribe(data => {
              this.totalPages = data.getError() ? 1 : data.getResponse()!;
              this.updatePagesArray();
              this.loading = false;
            });
        }
      });
  }

  updatePagesArray() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.actualPage = page;
      this.fetchProducts();
    }
  }

  private resetVariables(): void {
    this.totalPages = 1;
    this.products = [];
    this.loading = false;
  }
  addItem(item:IItemCart){
    if(this.table==undefined){
      this.tableIndicator.openModal();
      return;
    }
    if(this.user?.role=="anonimous"){
      this.cartService.addItemToCart(item);
      return;
    }
    var temporalOrder:ITemporalOrderDTO={tableId:this.table.id,productId:item.productId,quantity:item.quantity}
    this.service.post<ITemporalOrderDTO,ITemporalOrderDTO>(temporalOrder,"temporalOrders/full").subscribe(data=>{
      if(data.getError()){
        ToastManager.showToastError("No se pudo agregar el producto");
        return;
      }
      ToastManager.showToastSuccess("Producto agregado");
    });
  }
}
