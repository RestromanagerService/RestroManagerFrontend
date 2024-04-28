import { HttpParams } from "@angular/common/http";

export class BuildPagination {

    public static build(id:string,recordsNumber:number,actualPage:number,filter:string){
        let params = new HttpParams();
        if(id!=''){
            params=params.append('Id',id)
            params=params.append('RecordsNumber',recordsNumber.toString())
            params=params.append('Page',actualPage.toString())
            params=params.append('Filter',filter)
          }else{
            params=params.append('RecordsNumber',recordsNumber.toString())
            params=params.append('Page',actualPage.toString())
            params=params.append('Filter',filter)
          }
        return params;
    }
}
