import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { BuildPagination } from '../../../domain/models/pagination';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import { ToastManager } from '../../shared/alerts/toast-manager';
import { IStockRawMaterials } from '../../../domain/models/stock-raw-materials';

@Component({
  selector: 'app-stock-raw-materials',
  templateUrl: './stock-raw-materials.component.html',
  styleUrl: './stock-raw-materials.component.css'
})
export class StockRawMaterialsComponent {
  stock:IStockRawMaterials[]=[];
  actualPage:number=1;
  recordsNumber:number=10;
  totalPages:number=2;
  loading:boolean=true;
  urlRequest:string="StockRawMaterial/";
  valueSearch:string='';

  constructor(private stockService:GenericService<IStockRawMaterials>) {
    
  }

  ngOnInit(): void {
    if(this.recordsNumber!=0){
      this.stockService.getAll(this.urlRequest,BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch))
      .subscribe(data=>{
        this.stock=data.getResponse()
        if(!this.valueSearch.trim()){
        if(this.stock.length==0 && this.actualPage!=1){
          this.actualPage=this.actualPage-1;
          this.loading=true;
          this.ngOnInit()
        }}
        this.stockService.getTotalPages(this.urlRequest,
        BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch))
        .subscribe(data=>{
        this.totalPages=data.getResponse();
        this.loading=false;
        });
      });
    }
    else{
      this.stockService.getAll(this.urlRequest+"full")
      .subscribe(data=>{
        this.stock=data.getResponse()
        if(this.stock.length==0 && this.actualPage!=1){
          this.actualPage=this.actualPage-1;
          this.loading=true;
          this.ngOnInit()
        }
        console.log("entramos a consultar el full")
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
        this.stockService.delete(id,this.urlRequest).subscribe(data=>this.ngOnInit()); 
        ToastManager.showToastSuccess("Eliminación exitosa");
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
