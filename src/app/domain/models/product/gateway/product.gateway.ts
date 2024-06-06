import { Observable } from "rxjs";
import { IProduct } from "../../interfaces/Iproduct";


export abstract class ProductGateway {
    abstract getAllProducts(): Observable<IProduct[]>;

    abstract getProductById(id: string): Observable<IProduct>;
}
