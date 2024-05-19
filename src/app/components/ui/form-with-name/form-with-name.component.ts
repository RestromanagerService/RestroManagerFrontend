import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastManager } from '../../shared/alerts/toast-manager';
import { IModelWithName } from '../../../domain/models/interfaces/IModelWithName';
import { GenericService } from '../../../infraestructure/generic/generic-service';

const Toast = Swal.mixin({
  toast: true,
  animation: false,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
@Component({
  selector: 'app-form-with-name',
  templateUrl: './form-with-name.component.html',
  styleUrl: './form-with-name.component.css'
})
export class FormWithNameComponent{
  model?:IModelWithName;
  editModelForm: FormGroup;
  @Input() urlRequest:string="";
  @Input() urlBack:string="";
  @Input() isUpdate:boolean=true;

  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private formBuilder: FormBuilder, private service:GenericService){
    this.editModelForm = this.formBuilder.group({
        name: ['',Validators.required]})
  }
  
  ngOnInit(): void {
    var idModel=this._routeData.snapshot.params['id'];
    if(this.isUpdate){
      this.service.getById<IModelWithName>(this.urlRequest+"/",idModel)
      .subscribe(data=>{
        if(data.getError()){
          this._router.navigate(["/"+this.urlBack])
          ToastManager.showToastError(data.getResponseMessage());
        }else{
          this.model=data.getResponse();
        }
      })
    }
    
  }

  updateModel(){
    if(this.editModelForm.value.name!=this.model?.name&&
      this.editModelForm.value.name!=''){
      var idModel=this._routeData.snapshot.params['id'];
      var updateModel:IModelWithName={id:idModel,name:this.editModelForm.value.name}
      this.service.put<IModelWithName,IModelWithName>(updateModel,this.urlRequest).subscribe(data=>{
        this._router.navigate(["/"+this.urlBack])
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
        }
        else{
          ToastManager.showToastSuccess("Actualización exitosa");
        }
      });
      return
    }
    ToastManager.showToastInfo("No has realizado modificaciones");
  }
  saveModel(){
    if(this.editModelForm.value.name!=this.model?.name&&
      this.editModelForm.value.name!=''){
      var saveModel:IModelWithName={name:this.editModelForm.value.name}
      this.service.post<IModelWithName,IModelWithName>(saveModel,this.urlRequest).subscribe(data=>{
        this._router.navigate(["/"+this.urlBack])
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage())
        }
        else{
          ToastManager.showToastSuccess("Registro exitoso");
        }
      });
      return
    }
    ToastManager.showToastInfo("No has realizado modificaciones");
  }
}
