import { ICategory } from "./ICategory";
import { IProduct } from "./Iproduct";

export interface IProductCategory {
    id?:string;
    productId:string;
    product?:IProduct;
    categoryId:string;
    category:ICategory;
}
export interface INewProductCategory {
    categoryId:string;
}
