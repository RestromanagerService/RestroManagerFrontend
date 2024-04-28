import { Component } from '@angular/core';
import { IStockCommercialProducts } from '../../../domain/models/stock-commercial-products';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import { BuildPagination } from '../../../domain/models/pagination';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  animation: false,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
@Component({
  selector: 'app-stockcommercialproducts',
  templateUrl: './stockcommercialproducts.component.html',
  styleUrl: './stockcommercialproducts.component.css'
})
export class StockcommercialproductsComponent {
  stock:IStockCommercialProducts[]=[];
  actualPage:number=1;
  recordsNumber:number=10;
  totalPages:number=2;
  loading:boolean=true;
  valueSearch:string='';
  

  constructor(private stockService:GenericService<IStockCommercialProducts>) {
    
  }

  ngOnInit(): void {
    if(this.recordsNumber!=0){
      this.stockService.getAll("StockCommercialProduct/",BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch))
      .subscribe(data=>{
        this.stock=data.getResponse()
        if(this.stock.length==0 && this.actualPage!=1){
          this.actualPage=this.actualPage-1;
          this.loading=true;
          this.ngOnInit()
        }
        this.stockService.getTotalPages("StockCommercialProduct/",
        BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch))
        .subscribe(data=>{
        this.totalPages=data.getResponse();
        this.loading=false;
        });
      });
    }
    else{
      this.stockService.getAll("StockCommercialProduct/full")
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
        this.stockService.delete(id,"StockCommercialProduct/").subscribe(data=>this.ngOnInit()); 
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
