import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductGateway } from '../../domain/models/product/gateway/product.gateway';
import { IProduct } from '../../domain/models/interfaces/Iproduct';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends ProductGateway {
  private PRODUCT_URL_BASE: string = `https://restromanagerbackend.azurewebsites.net/api/Products`; 

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  });

  constructor(private http: HttpClient) {
    super();
  }

    getAllProducts(pagination?:HttpParams): Observable<IProduct[]> {
      return this.http.get<IProduct[]>(this.PRODUCT_URL_BASE, {headers:this.httpHeaders,params:pagination});
    }
    getProductById(id: string): Observable<IProduct> {
        return this.http.get<IProduct>(this.PRODUCT_URL_BASE + id, {headers:this.httpHeaders});
    }
}
