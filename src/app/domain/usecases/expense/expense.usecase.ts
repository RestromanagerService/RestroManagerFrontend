import { Injectable } from "@angular/core";
import { ExpenseGateway } from "../../models/expense/gateway/expense.gateway";
import { Observable, catchError, of } from "rxjs";
import { IExpense } from "../../models/interfaces/IExpense";


@Injectable()
export class ExpenseUseCase {
    constructor(private expenseGateway: ExpenseGateway){}
    getAllExpenses():Observable<IExpense[]>{
        return this.expenseGateway.getAllExpenses().pipe(catchError(
            (err)=>{return of(err.error)}
        ))
    }
    getExpenseById(id:string): Observable<IExpense>{
        return this.expenseGateway.getExpenseById(id).pipe(catchError(
            (err)=>{return of(err.error)}
        ))
    }

    deleteExpenseById(id: string): Observable<boolean> {
        return this.expenseGateway.deleteExpenseById(id).pipe(
          catchError((err) => {
            console.error('Error al eliminar el gasto', err);
            return of(false);
          })
        );
      }
    
}