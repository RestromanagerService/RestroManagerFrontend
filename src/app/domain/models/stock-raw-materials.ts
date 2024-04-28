import { INewRawMaterial, IRawMaterial } from "./IRawMaterial";
import { IUnits } from "./Iunits";


export interface IStockRawMaterials {
    id:string;
    rawMaterialId:string;
    rawMaterial:IRawMaterial;
    aumount:number; //TODO: Arreglar este error tipográfico en el back
    unitsId:string;
    units?:IUnits;
    unitCost:number;
}
export interface INewStockRawMaterials {
    rawMaterial:INewRawMaterial;
    aumount:number; //TODO: Arreglar este error tipográfico en el back
    unitsId:string;
    unitCost:number;
}
