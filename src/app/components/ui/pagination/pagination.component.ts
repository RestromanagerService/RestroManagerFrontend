import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit,OnChanges {
  @Input() actualPage:number=1;
  @Input() totalPages:number=2;
  @Input() recordsNumberActual:number=10;
  @Input() radius:number=1;
  @Output() pageNumber = new EventEmitter<number>();
  @Output() recordsNumber = new EventEmitter<number>();
  @Output() searchValue = new EventEmitter<string>();

  
  pages:number[]=[];
  paginationOptions=[[3,"3"],[5,"5"],[10,"10"],[25,"25"],[50,"50"],[0,"Todos"]]
  
  
  constructor(){
    this.createPaginator()
  }
  ngOnInit(): void {
    this.createPaginator()
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
  onSelectChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const value = parseInt(target.value);
      this.recordsNumber.emit(value);
    }
  }
  inputChange(event: Event){
    const target = event.target as HTMLSelectElement;
    if (target) {
      const value = target.value;
      this.searchValue.emit(value);
    }

  }

}
