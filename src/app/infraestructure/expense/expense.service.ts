import { Injectable } from '@angular/core';
import { ExpenseGateway } from '../../domain/models/expense/gateway/expense.gateway';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IExpense } from '../../domain/models/interfaces/IExpense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService extends ExpenseGateway{
  private EXPENSE_URL_BASE: string = `https://restromanagerbackend.azurewebsites.net/api/Expense`;
 

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  });

  constructor(private http: HttpClient) {
    super();
   }
   getAllExpenses(): Observable<IExpense[]> {
       return this.http.get<IExpense[]>(this.EXPENSE_URL_BASE,{headers:this.httpHeaders});
   }
   getExpenseById(id: string): Observable<IExpense> {
       return this.http.get<IExpense>(this.EXPENSE_URL_BASE + id, {headers:this.httpHeaders});
   }
   deleteExpenseById(id: string): Observable<boolean> {
    return this.http.delete(`${this.EXPENSE_URL_BASE}/${id}`, { headers: this.httpHeaders, observe: 'response' })
      .pipe(
        map(response => response.status === 204)
      );
  }
}
