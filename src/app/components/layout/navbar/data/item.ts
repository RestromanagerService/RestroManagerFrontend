import { SubItem } from "./sub-item";

export class Item {
    public name:string;
    private link?:string;
    private hasSubItem:boolean;
    private subItems?:SubItem[]=[];
    constructor(name:string,link?:string,subItems?:SubItem[]){
        this.name=name;
        this.link=link;
        this.hasSubItem=(subItems==undefined)?false:true;
        this.subItems=subItems;
    }
    getName():string{
        return this.name;
    }
    getLink():string{
        if(this.link==undefined){
            return "";
        }
        return this.link!;
    }
    hasSubItems():boolean{
        return this.hasSubItem;
    }
    getSubItems():SubItem[]{
        if(this.subItems==undefined){
            return [];
        }
        return this.subItems!;
    }
}
