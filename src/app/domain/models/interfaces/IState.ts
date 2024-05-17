import { ICountry } from "./ICountry";
export interface IState {
    id?:string;
    name : string;
    countryID:string ;
    country?: ICountry;
}
