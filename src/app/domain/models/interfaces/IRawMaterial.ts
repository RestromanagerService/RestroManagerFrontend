import { INewProductCategory, IProductCategory } from "./IProductCategory";

export interface IRawMaterial {
    id:string;
    name?:string;
    photo?:string;
}
export interface INewRawMaterial {
    name:string;
}
