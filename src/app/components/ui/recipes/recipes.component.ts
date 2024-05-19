import { Component } from "@angular/core";
import Swal from "sweetalert2";
import { IProductRecipe } from "../../../domain/models/interfaces/Iproduct";
import { BuildPagination } from "../../../domain/models/pagination";
import { ToastManager } from "../../shared/alerts/toast-manager";
import { GenericService } from "../../../infraestructure/generic/generic-service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  private URL_REQUEST:string="products/recipes/";
  recipes:IProductRecipe[]=[]
  actualPage:number=1;
  recordsNumber:number=10;
  totalPages:number=2;
  valueSearch:string='';
  loading:boolean=true;

  constructor(private recipesService:GenericService) {
    
  }

  ngOnInit(): void {
    if(this.recordsNumber!=0){
      let pagination=BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch);
      this.recipesService.getAll<IProductRecipe>(this.URL_REQUEST,pagination)
      .subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          this.resetVariables();
        }
        else{
          this.recipes=data.getResponse()!;
          if(this.recipes.length<0){
            ToastManager.showToastInfo("No hay registros por mostrar")
          }
          this.recipesService.getTotalPages(this.URL_REQUEST,pagination)
          .subscribe(data=>{
            this.totalPages=data.getError()?1:data.getResponse()!;
            this.loading=false;
          });
        }
    });
    }else{
      this.recipesService.getAll<IProductRecipe>(this.URL_REQUEST+"full")
      .subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          this.resetVariables();
        }
        else{
          this.recipes=data.getResponse()!;
          this.totalPages=1;
        }
        this.loading=false;
      });
    }
  }

  deleteProduct(id:string): void{
    Swal.fire({
      title: "¿Estás seguro de eliminar la receta?",
      text: "No podrás revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipesService.delete(id,this.URL_REQUEST).subscribe(data=>{
          if(data.getError()){
            ToastManager.showToastError(data.getResponseMessage());
          }
          else{
            this.ngOnInit();
            ToastManager.showToastSuccess("Eliminación exitosa")
          }
        });
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
  private resetVariables():void{
    this.totalPages=1;
    this.recipes=[];
    this.loading=false;
  }
}
