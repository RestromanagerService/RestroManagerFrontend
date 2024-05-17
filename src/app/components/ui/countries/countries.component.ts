import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../../domain/models/interfaces/ICountry';
import { ToastManager } from '../../shared/alerts/toast-manager';
import { GenericService } from '../../../infrastructure/generic/generic-service';
import { BuildPagination } from '../../../domain/models/pagination';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {
  private URL_REQUEST:string="countries/";
  countries:ICountry[] = [];
  actualPage:number=1;
  recordsNumber:number=10;
  totalPages:number=2;
  valueSearch:string='';
  loading:boolean = true;
  
  constructor(private countryService: GenericService) {
    
  }

  ngOnInit(): void {
    if (this.recordsNumber!=0) {
      let pagination=BuildPagination.build('',this.recordsNumber,this.actualPage,this.valueSearch);
      this.countryService.getAll<ICountry>(this.URL_REQUEST,pagination)
      .subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          this.resetVariables();
        }
        else{
          this.countries=data.getResponse()!;
          if(this.countries.length<0){
            ToastManager.showToastInfo("No hay registros por mostrar")
          }
          this.countryService.getTotalPages(this.URL_REQUEST,pagination)
          .subscribe(data=>{
            this.totalPages=data.getError()?1:data.getResponse()!;
            this.loading=false;
          });
        }
    });
    }else{
      this.countryService.getAll<ICountry>(this.URL_REQUEST+"full")
      .subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          this.resetVariables();
        }
        else{
          this.countries=data.getResponse()!;
          this.totalPages=1;
        }
        this.loading=false;
      });
    }
  }

  private resetVariables():void{
    this.totalPages=1;
    this.countries=[];
    this.loading=false;
  }

  

  deleteProduct(id:string): void{
    Swal.fire({
      title: "¿Estás seguro de eliminar el país?",
      text: "No podrás revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.countryService.delete(id,this.URL_REQUEST).subscribe(data=>{
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
  
}
