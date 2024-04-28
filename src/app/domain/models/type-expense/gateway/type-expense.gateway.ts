import { Observable } from "rxjs";
import { IWithName } from "../../IWithName";

export abstract class TypeExpenseGateway {
    abstract getAllTypeExpenses() : Observable<IWithName[]>
    abstract getTypeExpenseById(id: string) : Observable<IWithName>
}