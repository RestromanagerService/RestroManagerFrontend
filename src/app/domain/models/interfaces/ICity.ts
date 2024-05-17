import { IState } from "./IState";

export interface ICity {
    id?:string;
    name : string;
    stateID:string ;
    state?: IState;
}
