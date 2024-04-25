import { Component, Input, OnInit } from '@angular/core';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {


  actualPage:number=1;
  @Input() id:string='';
  @Input() recordsNumber:number=2;
  page:number=1;
  totalPages:number=2;
  constructor(private service:GenericService<Object>){
    
  }

  ngOnInit(): void {
    let params = new HttpParams();
    if(this.id!=''){
      params.set('id',this.id)
    }
    params.set('RecordsNumber', this.recordsNumber.toString());
    params.set('Page', this.page.toString());
    this.service.getTotalPages("categories/",params).subscribe(data=>this.totalPages=data.getResponse());
  }

  range(startPage: number,endPage: number){
    let pages:number[]=[]
    for (let i=startPage;i<=endPage;i++){
        pages.push(i);
    }
    return pages;
  }

}
