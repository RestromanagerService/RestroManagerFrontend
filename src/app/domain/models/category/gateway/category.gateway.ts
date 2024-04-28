import { Observable } from "rxjs";
import { IWithName } from "../../interfaces/IWithName";


export abstract class CategoryGateway {
    abstract getAllCategories(): Observable<IWithName[]>;

    abstract getCategoryById(id: string): Observable<IWithName>;
}
