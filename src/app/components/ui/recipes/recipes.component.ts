import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { BuildPagination } from '../../../domain/models/pagination';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import { IProductRecipe } from '../../../domain/models/interfaces/Iproduct';

const Toast = Swal.mixin({
  toast: true,
  animation: false,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  recipes:IProductRecipe[]=[]
  actualPage:number=1;
  recordsNumber:number=10;
  totalPages:number=2;
  valueSearch:string='';
  loading:boolean=true;

  constructor(private recipesService:GenericService<IProductRecipe>) {
    
  }

  ngOnInit(): void {
    if(this.recordsNumber!=0){
    this.recipesService.getAll("products/recipes/",BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch))
    .subscribe(data=>{
      this.recipes=data.getResponse()
      if(!this.valueSearch.trim()){
        if(this.recipes.length==0 && this.actualPage!=1){
          this.actualPage=this.actualPage-1;
          this.ngOnInit()
        }
      }
      this.recipesService.getTotalPages("products/recipes/",
        BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch))
        .subscribe(data=>{
        this.totalPages=data.getResponse();
        this.loading=false;
        });
    })
    }else{
      this.recipesService.getAll("products/recipes/full")
      .subscribe(data=>{
      this.recipes=data.getResponse()
      if(this.recipes.length==0 && this.actualPage!=1){
        this.actualPage=this.actualPage-1;
        this.ngOnInit()
      }
      this.totalPages=1;
      this.loading=false;
      });
    }
  }

  deleteProduct(id:string): void{
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
        this.recipesService.delete(id,"products/").subscribe(data=>this.ngOnInit()); 
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
