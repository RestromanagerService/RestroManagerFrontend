import { Observable } from "rxjs";
import { IExpense } from "../../interfaces/IExpense";

export abstract class ExpenseGateway {
    abstract getAllExpenses() : Observable<IExpense[]>
    abstract getExpenseById(id: string) : Observable<IExpense>
    abstract deleteExpenseById(id: string) : Observable<boolean>
}