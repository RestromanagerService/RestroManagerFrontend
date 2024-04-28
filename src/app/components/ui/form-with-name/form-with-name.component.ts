import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import { IModelWithName } from '../../../domain/models/IModelWithName';
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
    private formBuilder: FormBuilder, private modelService:GenericService<IModelWithName>){
    this.editModelForm = this.formBuilder.group({
        name: ['',Validators.required]})
  }
  
  ngOnInit(): void {
    var idModel=this._routeData.snapshot.params['id'];
    if(this.isUpdate){
      this.modelService.getById(this.urlRequest+"/",idModel).subscribe(data=>this.model=data.getResponse())
    }
    
  }

  updateModel(){
    if(this.editModelForm.value.name!=this.model?.name&&
      this.editModelForm.value.name!=''){
      var idModel=this._routeData.snapshot.params['id'];
      var updateModel:IModelWithName={id:idModel,name:this.editModelForm.value.name}
      this.modelService.put(updateModel,this.urlRequest).subscribe();
      this._router.navigate(["/"+this.urlRequest])
      Toast.fire({
        icon: 'success',
        title: 'Actualización exitosa',
      })
      return
    }
    Toast.fire({
      icon: 'info',
      title: 'No has realizado modificaciones',
    })

  }
  saveModel(){
    if(this.editModelForm.value.name!=this.model?.name&&
      this.editModelForm.value.name!=''){
      var updateModel:IModelWithName={name:this.editModelForm.value.name}
      this.modelService.post(updateModel,this.urlRequest).subscribe();
      this._router.navigate(["/"+this.urlRequest])
      Toast.fire({
        icon: 'success',
        title: 'Actualización exitosa',
      })
      return
    }
    Toast.fire({
      icon: 'info',
      title: 'No has realizado modificaciones',
    })

  }
}
