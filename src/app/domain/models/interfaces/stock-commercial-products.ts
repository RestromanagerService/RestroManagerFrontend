import { INewProduct, IProduct } from "./Iproduct";
import { IUnits } from "../Iunits";


export interface IStockCommercialProducts {
    id:string;
    productId:string;
    product:IProduct;
    aumount:number; //TODO: Arreglar este error tipográfico en el back
    unitsId:string;
    units?:IUnits;
    unitCost:number;
}
export interface INewStockCommercialProducts {
    product:INewProduct;
    aumount:number; //TODO: Arreglar este error tipográfico en el back
    unitsId:string;
    unitCost:number;
}
