import { ICity } from "./ICity";

export interface IUser {
    document: string;
    firstName: string;
    lastName: string;
    address: string;
    photo?: string;
    phoneNumber:string;
    city?: ICity;
    cityId: string;
}
