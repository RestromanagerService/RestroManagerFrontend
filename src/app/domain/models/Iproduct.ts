import { ICategory } from "./ICategory";
import { INewProductCategory, IProductCategory } from "./IProductCategory";

export interface IProduct {
    id:string;
    name?:string;
    productionCost?:number;
    productCategories:IProductCategory[];
    productCategoriesNumber?:number;
}
export interface INewProduct {
    name:string;
    productionCost?:number;
    productCategories:INewProductCategory[];
    productCategoriesNumber?:number;
}
