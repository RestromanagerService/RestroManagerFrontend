import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CategoryGateway } from "../../models/category/gateway/category.gateway";
import { catchError } from 'rxjs/operators'
import { IWithName } from "../../models/IWithName";

@Injectable()
export class CategoryUseCase {
    constructor(private categoryGateway: CategoryGateway) {}

    getAllCategories(): Observable<IWithName[]> {
        return this.categoryGateway.getAllCategories().pipe(
            catchError((err) => {
                return of(err.error);
            })
        );
    }

    getCategoryById(id: string): Observable<IWithName> {
        return this.categoryGateway.getCategoryById(id).pipe(
            catchError((err) => {
                return of(err.error);
            })
        );
    }
}
