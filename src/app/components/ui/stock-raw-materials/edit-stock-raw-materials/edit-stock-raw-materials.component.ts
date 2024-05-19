import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IStockRawMaterials } from '../../../../domain/models/stock-raw-materials';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import Swal from 'sweetalert2';
import { IUnits } from '../../../../domain/models/Iunits';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';

@Component({
  selector: 'app-edit-stock-raw-materials',
  templateUrl: './edit-stock-raw-materials.component.html',
  styleUrl: './edit-stock-raw-materials.component.css'
})
export class EditStockRawMaterialsComponent {
  private URL_REQUEST:string="StockRawMaterial";
  model!:IStockRawMaterials;
  units:IUnits[]=[];
  editModelForm: FormGroup;
  urlBack:string="/stockRawMaterials";
  idModel:string='';
  loading:boolean=true;

  settingsUnits={
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    allowSearchFilter: true
  }; ;



  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private formBuilder: FormBuilder,
    private service:GenericService){
      
    this.idModel=_routeData.snapshot.params['id'];
    this.editModelForm = new FormGroup({
      nameRawMaterial: new FormControl('',Validators.required),
      amount:new FormControl('',Validators.required),
      unitsId:new FormControl([],Validators.required),
      unitCost:new FormControl('',Validators.required),
    });
  }
  
  ngOnInit(): void {
    this.getModelById().subscribe(dataModel=>{
      if(dataModel.getError()){
        this.navigateUrlBack();
        ToastManager.showToastError(dataModel.getResponseMessage());
        return;
      }
      this.model=dataModel.getResponse()!;
      this.getUnits().subscribe(dataUnits=>{
        if(dataUnits.getError()){
          this.navigateUrlBack();
          ToastManager.showToastError(dataUnits.getResponseMessage());
          return;
        }
        this.units=dataUnits.getResponse()!;
        this.editModelForm.controls['nameRawMaterial'].setValue(this.model.rawMaterial.name);
        this.editModelForm.controls['amount'].setValue(this.model.aumount);
        let units:IUnits[]=[];
        units.push({id:this.model.unitsId,name:this.model.units?.name});
        this.editModelForm.controls['unitsId'].setValue(units);
        this.editModelForm.controls['unitCost'].setValue(this.model.unitCost);
        this.loading=false;
       })
   })
  }

  getModelById():Observable<HttpResponseWrapper<IStockRawMaterials>>{
    return this.service.getById<IStockRawMaterials>(this.URL_REQUEST+"/",this.idModel)
  }
  getUnits():Observable<HttpResponseWrapper<IUnits[]>>{
    return this.service.getAll<IUnits>("Units/full")
  }
  updateModel(){
    if(!this.validarErrores()){
      ToastManager.showToastError("Todos los campos son necesarios")
      return
    }
    if(this.hasChanged())
    {
      var updateModel:IStockRawMaterials=
      {
        id:this.idModel,
        rawMaterialId:this.model.rawMaterial.id,
        rawMaterial:{
          id:this.model.rawMaterial.id,
          name:this.editModelForm.value.nameRawMaterial,
        },
        aumount:this.editModelForm.value.amount,
        unitsId:this.editModelForm.value.unitsId[0].id,
        unitCost:this.editModelForm.value.unitCost
      };
      this.service.put<IStockRawMaterials,IStockRawMaterials>(updateModel,this.URL_REQUEST).subscribe(data=>{
      if(data.getError()){
        this.navigateUrlBack();
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      this.navigateUrlBack();
      ToastManager.showToastSuccess("Actualización exitosa");
      });
      return
    }
    ToastManager.showToastInfo("No has realizado modificaciones");
  }
  back():void{
    if(!this.validarErrores()){
      this._router.navigate(["/"+this.urlBack]);
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
        if (result.isConfirmed) {
          this.navigateUrlBack();
        }
      })
    }else{
      this.navigateUrlBack();
    }
  }
  hasChanged():boolean{
    if(this.editModelForm.value.nameRawMaterial!=this.model.rawMaterial.name){
      return true;
    }
    if(this.editModelForm.value.amount!=this.model.aumount){
      return true;
    }
    if(this.editModelForm.value.unitsId[0].id!=this.model.units!.id){
      return true;
    }
    if(this.editModelForm.value.unitCost!=this.model.unitCost){
      return true;
    }
    return false;
  }
  private validarErrores():boolean{
    if(this.editModelForm.get('nameRawMaterial')!.errors){
      return false;
    }
    if(this.editModelForm.get('amount')!.errors){
      return false;
    }
    if(this.editModelForm.get('unitsId')!.errors){
      return false;
    }
    if(this.editModelForm.get('unitCost')!.errors){
      return false;
    }
    return true;
  }
  private navigateUrlBack(){
    this._router.navigate(["/"+this.urlBack]);
  }
}
