import { Injectable } from '@angular/core';
import { TypeExpenseGateway } from '../domain/models/type-expense/gateway/type-expense.gateway';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWithName } from '../domain/models/IWithName';

@Injectable({
  providedIn: 'root'
})
export class TypeExpenseService extends TypeExpenseGateway {
  private TYPE_EXPENSE_URL_BASE: string = `https://localhost:7056/api/TypeExpense`;
 
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  });
  constructor(private http: HttpClient) {
    super();
   }

  getAllTypeExpenses(): Observable<IWithName[]> {
      return this.http.get<IWithName[]>(this.TYPE_EXPENSE_URL_BASE, {headers: this.httpHeaders});
  }

  getTypeExpenseById(id: string): Observable<IWithName> {
      return this.http.get<IWithName>(this.TYPE_EXPENSE_URL_BASE + id,{headers: this.httpHeaders});
  }

}
