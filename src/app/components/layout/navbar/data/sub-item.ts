export class SubItem {
    private name:string;
    private link:string;
    constructor(name:string,link:string){
        this.name=name;
        this.link=link;
    }
    getName():string{
        return this.name;
    }
    getLink():string{
        return this.link!;
    }
}
