import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../domain/models/interfaces/Iproduct';
import { BuildPagination } from '../../../domain/models/pagination';
import { ToastManager } from '../../shared/alerts/toast-manager';
import { GenericService } from '../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products!: IProduct[];
  private URL_REQUEST: string = "Products/";
  actualPage: number = 1;
  recordsNumber: number = 3;
  totalPages: number = 1;
  loading: boolean = true;
  valueSearch: string = '';
  pages: number[] = [];

  constructor(private productService: GenericService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.loading = true;
    let pagination = BuildPagination.build('', this.recordsNumber, this.actualPage, this.valueSearch);
    this.productService.getAll<IProduct>(this.URL_REQUEST, pagination)
      .subscribe(data => {
        if (data.getError()) {
          ToastManager.showToastError(data.getResponseMessage());
          this.resetVariables();
        } else {
          this.products = data.getResponse()!;
          if (this.products.length === 0) {
            ToastManager.showToastInfo("No hay registros por mostrar");
          }
          this.productService.getTotalPages(this.URL_REQUEST, pagination)
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
}
