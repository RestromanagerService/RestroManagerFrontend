import { IUser } from "./IUser";
import { IProduct } from "./Iproduct";

export interface IOrder {
    id: number;
    items: any[];
    status: string;
    datetimeBegin: string;
    datetimeUpdate: string;
}
export interface ITable{
  id:string;
  name:string;
}
export interface ITemporalOrder{
  tableId:string;
  table?: ITable;
  userId?: string;
  user?:IUser;
  productId: string;
  product?:IProduct;
  quantity: number;
  value?:number;
}
export interface ITemporalOrderDTO{
  tableId:string;
  productId: string;
  quantity: number;
}