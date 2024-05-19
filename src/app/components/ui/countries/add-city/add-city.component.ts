import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IState } from '../../../../domain/models/interfaces/IState';
import { ICity } from '../../../../domain/models/interfaces/ICity';
import { IWithName } from '../../../../domain/models/interfaces/IWithName';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { IModelWithName } from '../../../../domain/models/interfaces/IModelWithName';
import { GenericService } from '../../../../infraestructure/generic/generic-service';

const Toast = Swal.mixin({
  toast: true,
  animation: false,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css'
})



export class AddCityComponent {
  createModelForm: FormGroup;
  state:IState[] = [];
  idState:string = "";
  idCountry:string = "";

  urlRequest:string="Cities";
  urlBack:string="";
  idModel:string='';

  
  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private service:GenericService){
      this.createModelForm = new FormGroup({
        nameCity: new FormControl('', Validators.required)
      });
      this.idState = _routeData.snapshot.params['id'];
      this.idCountry = _routeData.snapshot.params['idCountry'];
    }

    ngOnInit(): void {
      console.log(this.idCountry);
      console.log(this.idState);
      this.urlBack = '/state/'+this.idCountry+ '/cities/'+ this.idState;



    }

    saveModel(){
      if(this.validarErrores()){
        var cityName: string = this.createModelForm.value.nameCity;
        //this.createModelForm.get('nameCity')
        var newCity: ICity = {name: cityName, stateID:this.idState };
        this.service.post<ICity,ICity>(newCity,this.urlRequest).subscribe(data=>{
            if(data.getError()){
              this.navigateUrlBack();
              ToastManager.showToastError(data.getResponseMessage());
              return;
            }
            this.navigateUrlBack();
            ToastManager.showToastSuccess("Registro exitoso");
          });
      }else{
        ToastManager.showToastWarning("Tienes campos sin rellenar")
      }
    }

    back():void{
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
          if (result.isConfirmed) {
            this.navigateUrlBack();
          }
        })
      }else{
        this.navigateUrlBack();
      }
    }

 

    private hasChanged():boolean{
      if(this.createModelForm.value != ''){
        return true;
      }
      return false;
    }


    private validarErrores():boolean{
      if(this.createModelForm.get('nameCity')!.errors){
        return false;
      }
      return true;
    }

    private navigateUrlBack(){
      this._router.navigate([this.urlBack]);
    }

}
