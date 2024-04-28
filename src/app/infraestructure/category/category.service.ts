import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWithName } from '../../domain/models/interfaces/IWithName';
import { CategoryGateway } from '../../domain/models/category/gateway/category.gateway';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends CategoryGateway {
  private CATEGORY_URL_BASE: string = `https://localhost:7056/api/Categories`; 

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  });

  constructor(private http: HttpClient) {
    super();
  }

  getAllCategories(): Observable<IWithName[]> {
    return this.http.get<IWithName[]>(this.CATEGORY_URL_BASE, { headers: this.httpHeaders });
  }

  getCategoryById(id: string): Observable<IWithName> {
    return this.http.get<IWithName>(this.CATEGORY_URL_BASE + id, { headers: this.httpHeaders });
  }
}
