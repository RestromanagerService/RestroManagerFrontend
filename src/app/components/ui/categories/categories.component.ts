import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../domain/models/interfaces/ICategory';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import Swal from 'sweetalert2';
import { BuildPagination } from '../../../domain/models/pagination';

const Toast = Swal.mixin({
  toast: true,
  animation: false,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  
  categorias:ICategory[]=[];
  actualPage:number=1;
  recordsNumber:number=10;
  totalPages:number=2;
  valueSearch:string='';
  loading:boolean=true;

  constructor(private categoryService:GenericService<ICategory>) {
    
  }

  ngOnInit(): void {
    if(this.recordsNumber!=0){
    this.categoryService.getAll("categories/",BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch))
    .subscribe(data=>{
      this.categorias=data.getResponse()
      if(!this.valueSearch.trim()){
        if(this.categorias.length==0 && this.actualPage!=1){
          this.actualPage=this.actualPage-1;
          this.ngOnInit()
        }
      }
      this.categoryService.getTotalPages("categories/",
      BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch))
      .subscribe(data=>{
      this.totalPages=data.getResponse();
      this.loading=false;
      });
    })
    }else{
      this.categoryService.getAll("categories/full")
      .subscribe(data=>{
      this.categorias=data.getResponse()
      if(this.categorias.length==0 && this.actualPage!=1){
        this.actualPage=this.actualPage-1;
        this.ngOnInit()
      }
      this.totalPages=1;
      this.loading=false;
      });
    }
  }

  deleteCategory(id:string): void{
    Swal.fire({
      title: "¿Estás seguro de eliminar la categoría?",
      text: "No podrás revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id,"categories/").subscribe(data=>this.ngOnInit()); 
        Toast.fire({
          icon: 'success',
          title: 'Eliminación exitosa',
        })
      }
    });    
  }

  getChange(page:number){
    this.actualPage=page;
    this.ngOnInit()
  }
  getChangeRecordsNumber(records:number){
    this.actualPage=1;
    this.recordsNumber=records;
    this.loading=true;
    this.ngOnInit();
  }
  getChangeValueSearch(valueSearch:string){
    this.actualPage=1;
    this.valueSearch=valueSearch;
    this.loading=true;
    this.ngOnInit();
  }

}
