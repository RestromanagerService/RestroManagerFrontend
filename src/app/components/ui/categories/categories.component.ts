import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { ICategory } from "../../../domain/models/interfaces/ICategory";
import { BuildPagination } from "../../../domain/models/pagination";
import { ToastManager } from "../../shared/alerts/toast-manager";
import { GenericService } from "../../../infraestructure/generic/generic-service";

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
  categories:ICategory[]=[];
  actualPage:number=1;
  recordsNumber:number=10;
  totalPages:number=1;
  valueSearch:string='';
  loading:boolean=true;

  constructor(private service:GenericService) {
    
  }

  ngOnInit(): void {
    if(this.recordsNumber!=0){
      let pagination=BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch);
      this.service.getAll<ICategory>("categories/",pagination)
      .subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          this.resetVariables();
        }
        else{
          this.categories=data.getResponse()!;
          if(this.categories.length<0){
            ToastManager.showToastInfo("No hay registros por mostrar")
          }
          this.service.getTotalPages("categories/",pagination)
          .subscribe(data=>{
            this.totalPages=data.getError()?1:data.getResponse()!;
            this.loading=false;
          });
        }
    });
    }else{
      this.service.getAll<ICategory>("categories/full")
      .subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          this.resetVariables();
        }
        else{
          this.categories=data.getResponse()!;
          this.totalPages=1;
        }
        this.loading=false;
      });
    }
  }
  resetVariables():void{
    this.totalPages=1;
    this.categories=[];
    this.loading=false;
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
        this.service.delete(id,"categories/").subscribe(data=>{
          if(data.getError()){
            ToastManager.showToastError(data.getResponseMessage());
          }
          else{
            this.ngOnInit();
            ToastManager.showToastSuccess("Eliminación exitosa")
          }
        }); 
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
    if(this.recordsNumber<0){
      this.recordsNumber=10;
    }
    this.ngOnInit();
  }
  getChangeValueSearch(valueSearch:string){
    this.actualPage=1;
    this.valueSearch=valueSearch;
    this.loading=true;
    this.ngOnInit();
  }

}
