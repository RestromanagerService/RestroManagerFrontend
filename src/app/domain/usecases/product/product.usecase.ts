import { Injectable } from "@angular/core";
import { ProductGateway } from "../../models/product/gateway/product.gateway";
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators'
import { IProduct } from "../../models/interfaces/Iproduct";



@Injectable()
export class ProductUseCase {
    constructor(private productGateway: ProductGateway){}

    getAllProducts():Observable<IProduct[]>{
        return this.productGateway.getAllProducts().pipe(
            catchError((err)=>{
                return of(err.error);
            })
        );
    }
    getProductById(id:string):Observable<IProduct>{
        return this.productGateway.getProductById(id).pipe(
            catchError((err)=>{
                return of(err.error);
            })
        );
    }
}