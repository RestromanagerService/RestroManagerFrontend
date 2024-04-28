import { INewProductCategory, IProductCategory } from "./IProductCategory";
import { IUnits } from "../Iunits";

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
export interface IProductRecipe {
    id:string;
    name:string;
    productFoods:IProductFoods[];
    productFoodsNumber:number;
    productCategories:INewProductCategory[];
    productCategoriesNumber?:number;
    productionCost:number;
}
export interface IProductFoods {
    id:string;
    amount:number;
    unitsId:string;
    units:IUnits;
    foodId:string;
    food:IFood;
}
export interface IFood {
    id:string;
    name?:string;
}
export interface INewFood {
    name:string;
}
