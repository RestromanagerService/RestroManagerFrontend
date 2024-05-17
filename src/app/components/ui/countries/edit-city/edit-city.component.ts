import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IState } from '../../../../domain/models/interfaces/IState';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../../../infrastructure/generic/generic-service';
import { ICity } from '../../../../domain/models/interfaces/ICity';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpResponseWrapper } from '../../../../infrastructure/generic/http-response-wrapper';


@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrl: './edit-city.component.css'
})
export class EditCityComponent {

  editCityModelForm: FormGroup;
  cityModel!:ICity;
  idCity:string  ="";
  idState:string = "";
  idCountry:string = "";

  urlRequest:string="Cities/";
  urlBack:string = "";
  loading:boolean=true;


  
  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private service:GenericService){
      this.editCityModelForm = new FormGroup({
        nameCity: new FormControl('', Validators.required)
      });
      
      this.idState = _routeData.snapshot.params['idState'];
      this.idCountry = _routeData.snapshot.params['idCountry'];
      this.idCity = _routeData.snapshot.params['idCity'];
    }

  ngOnInit(): void {

    this.urlBack = '/state/'+this.idCountry+ '/cities/'+ this.idState;
    this.getModelById().subscribe(cityDataModel=>{
      if(cityDataModel.getError()){
        this.navigateUrlBack();
        ToastManager.showToastError(cityDataModel.getResponseMessage());
        return;
      }
      this.cityModel=cityDataModel.getResponse()!;
      this.editCityModelForm.controls['nameCity'].setValue(this.cityModel.name);
      this.loading=false;
    })

  }

  updateModel(){
    if(!this.validarErrores()){
      ToastManager.showToastError("El campo es necesario");
      return;

    }
    if(this.hasChanged())
    {
      var updateModel:ICity=
      {
        id:this.idCity,
        name:this.editCityModelForm.value.nameCity,
        stateID:this.idState,
      };
      this.service.put<ICity,ICity>(updateModel,this.urlRequest).subscribe(data=>{
        if(data.getError()){
          this.navigateUrlBack();
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        this.navigateUrlBack();
        ToastManager.showToastSuccess("Actualización exitosa");
        });
      return;
    }
    ToastManager.showToastInfo("No has realizado modificaciones");
  };

  back():void{
    if(!this.validarErrores()){
      this._router.navigate([this.urlBack]);
      return
    }
    if(this.hasChanged()){
      Swal.fire({
        title: "¿Estás seguro de salir?",
        text: "Perderás los cambios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, descartar cambios",
      }).then((result) => {
        if (result.isConfirmed){
          this.navigateUrlBack();
        };
      })
    }else{
      this.navigateUrlBack();
    }
  }
    
  getModelById():Observable<HttpResponseWrapper<ICity>> {
    return this.service.getById<ICity>(this.urlRequest,this.idCity);
  } ;


 

  private hasChanged():boolean{
      if(this.editCityModelForm.value != this.cityModel.name){
        return true;
      }
      return false;
    }


  private validarErrores():boolean{
      if(this.editCityModelForm.get('nameCity')!.errors){
        return false;
      }
      return true;
  }

  private navigateUrlBack(){
      this._router.navigate([this.urlBack]);
  }
}


