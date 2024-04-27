import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import { BuildPagination } from '../../../domain/models/pagination';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit,OnChanges {
  @Input() actualPage:number=1;
  @Input() totalPages:number=2;
  @Input() radius:number=1;
  @Output() pageNumber = new EventEmitter<number>();

  
  pages:number[]=[]  
  
  
  constructor(){
    this.createPaginator()
  }
  ngOnInit(): void {
    

  }
  ngOnChanges(changes: SimpleChanges): void {
      this.ngOnInit(); 
  }
  createPaginator(){
    this.pages=[]
    let limInf=this.actualPage-this.radius;
    let limSup=this.actualPage+this.radius;
    limInf=(limInf<=0)?1:limInf;
    limSup=(limSup>this.totalPages)?this.totalPages:limSup;
    let cont=limInf
    while(this.pages.length<=this.radius*2+1){
      this.pages.push(cont);
      cont+=1;
    }
  }

  pageTurn(page:number){
    if(page>0 && page<=this.totalPages){
      this.pageNumber.emit(page);
    }
  }

}
