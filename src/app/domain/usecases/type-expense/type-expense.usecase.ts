import { Injectable } from "@angular/core";
import { TypeExpenseGateway } from "../../models/type-expense/gateway/type-expense.gateway";
import { Observable, catchError, of } from "rxjs";
import { IWithName } from "../../models/interfaces/IWithName";

@Injectable()
export class TypeExpenseUseCase {
    constructor(private typeExpenseGateway: TypeExpenseGateway){}

    getAllTypeExpenses(): Observable<IWithName[]>{
        return this.typeExpenseGateway.getAllTypeExpenses().pipe(
            catchError((err)=>{
                return of(err.eror);
            })
        );
    }
    getTypeExpenseById(id: string): Observable<IWithName> {
        return this.typeExpenseGateway.getTypeExpenseById(id).pipe(
            catchError((err)=>{
                return of(err.error);
            })
        );
    }
}