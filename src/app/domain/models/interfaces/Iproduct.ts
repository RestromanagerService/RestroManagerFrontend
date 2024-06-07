import { INewProductCategory, IProductCategory } from "./IProductCategory";
import { IUnits } from "../Iunits";
import { ProductType } from "../enums/user-type";
import { IRawMaterial } from "./IRawMaterial";

export interface IProduct {
    id:string;
    name?:string;
    productType:ProductType;
    productionCost?:number;
    productCategories:IProductCategory[];
    productCategoriesNumber?:number;
    photo?:string;
    price?:number;
}
export interface INewProduct {
    name:string;
    productType:ProductType;
    productionCost?:number;
    productCategories:INewProductCategory[];
    productCategoriesNumber?:number;
    price?:number;
}
export interface IProductRecipe {
    id?:string;
    name:string;
    productType:ProductType;
    productFoods?:IProductFoods[];
    productFoodsNumber?:number;
    productCategories?:INewProductCategory[];
    productCategoriesNumber?:number;
    productionCost?:number;
    price?:number;
}
export interface IProductFoods {
    id?:string;
    amount:number;
    unitsId:string;
    units?:IUnits;
    foodId?:string;
    food?:IFood;
    productId:string;
    product?:IProduct;
}
export interface IFoodRawMaterials {
    id?:string;
    amount:number;
    unitsId:string;
    units?:IUnits;
    foodId?:string;
    food?:IFood;
    rawMaterialId:string;
    rawMaterial?:IRawMaterial;
}
export interface IFood {
    id?:string;
    name?:string;
    foodRawMaterials?:IFoodRawMaterials[];
    foodRawMaterialsNumber?:number;
    productionCost:number;
    photo?:string;
}
export interface INewFood {
    name:string;
}

export interface IItemCart{
    id?:string;
    productId:string;
    product?:IProduct;
    quantity: number;
    value?:number;
}