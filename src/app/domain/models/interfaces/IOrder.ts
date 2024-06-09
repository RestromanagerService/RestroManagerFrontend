import { IUser } from "./IUser";
import { IProduct } from "./Iproduct";

export interface IOrder {
    id: number;
    items: any[];
    status: string;
    datetimeBegin: string;
    datetimeUpdate: string;
    tableId: string;
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
  productId?: string;
  quantity?: number;
  temporalOrders?: any;
}

interface IOrderDetail {
  id: number;
  order: any | null;
  orderId: number;
  product: IProduct;
  productId: number;
  quantity: number;
  value: number;
}

export interface IOrderDTO{
  id: number;
  date: string;
  user: IUser;
  userId: string;
  table: any | null;
  tableId: number;
  orderStatus: number;
  orderDetails: IOrderDetail[];
  quantity: number;
  value: number;
}