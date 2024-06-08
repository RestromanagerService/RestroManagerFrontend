import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastManager } from '../../shared/alerts/toast-manager';
import { IStockRawMaterials } from '../../../domain/models/interfaces/stock-raw-materials';
import { BuildPagination } from '../../../domain/models/pagination';
import { GenericService } from '../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-stock-raw-materials',
  templateUrl: './stock-raw-materials.component.html',
  styleUrl: './stock-raw-materials.component.css'
})
export class StockRawMaterialsComponent {
  private URL_REQUEST:string="StockRawMaterial/";
  stock:IStockRawMaterials[]=[];
  actualPage:number=1;
  recordsNumber:number=10;
  totalPages:number=2;
  loading:boolean=true;
  valueSearch:string='';

  constructor(private stockService:GenericService) {
    
  }

  ngOnInit(): void {
    if(this.recordsNumber!=0){
      let pagination=BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch);
      this.stockService.getAll<IStockRawMaterials>(this.URL_REQUEST,pagination)
      .subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          this.resetVariables();
        }
        else{
          this.stock=data.getResponse()!;
          if(this.stock.length<0){
            ToastManager.showToastInfo("No hay registros por mostrar")
          }
          this.stockService.getTotalPages(this.URL_REQUEST,pagination)
          .subscribe(data=>{
            this.totalPages=data.getError()?1:data.getResponse()!;
            this.loading=false;
          });
        }
    });
    }else{
      this.stockService.getAll<IStockRawMaterials>(this.URL_REQUEST+"full")
      .subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          this.resetVariables();
        }
        else{
          this.stock=data.getResponse()!;
          this.totalPages=1;
        }
        this.loading=false;
      });
    }

  }
  

  deleteProduct(id:string): void{
    Swal.fire({
      title: "¿Estás seguro de eliminar la materia prima?",
      text: "No podrás revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.stockService.delete(id,this.URL_REQUEST).subscribe(data=>{
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
    this.stock=[];
    this.loading=false;
  }
}
