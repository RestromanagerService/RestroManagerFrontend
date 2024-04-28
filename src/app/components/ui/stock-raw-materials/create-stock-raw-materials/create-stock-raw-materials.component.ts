import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { IUnits } from '../../../../domain/models/Iunits';
import { INewStockRawMaterials, IStockRawMaterials } from '../../../../domain/models/stock-raw-materials';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';
import { ToastManager } from '../../../shared/alerts/toast-manager';

@Component({
  selector: 'app-create-stock-raw-materials',
  templateUrl: './create-stock-raw-materials.component.html',
  styleUrl: './create-stock-raw-materials.component.css'
})
export class CreateStockRawMaterialsComponent {
  units:IUnits[]=[];
  editModelForm: FormGroup;
  urlRequest:string="StockRawMaterial";
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
    private modelService:GenericService<INewStockRawMaterials>,
    private unitsService:GenericService<IUnits>){
      
    this.idModel=_routeData.snapshot.params['id'];
    this.editModelForm = new FormGroup({
      nameRawMaterial: new FormControl('',Validators.required),
      amount:new FormControl('',Validators.required),
      unitsId:new FormControl([],Validators.required),
      unitCost:new FormControl('',Validators.required),
    });
  }
  
  ngOnInit(): void {
    this.getUnits().subscribe(dataUnits=>{
        this.units=dataUnits.getResponse();
        this.loading=false;
    })
  }

  getUnits():Observable<HttpResponseWrapper<IUnits[]>>{
    return this.unitsService.getAll("Units/full")
  }
  saveModel(){
    if(this.validarErrores())
    {
      var saveModel:INewStockRawMaterials=
      {
        rawMaterial:{
          name:this.getRawMaterialName(),
        },
        aumount:this.getAmount(),
        unitsId:this.getUnitsForm().id,
        unitCost:this.getUnitCost()
      };
      this.modelService.post(saveModel,this.urlRequest).subscribe();
      this._router.navigate(["/"+this.urlBack]);
      ToastManager.showToastSuccess("Registro exitoso");
      return
    }
    ToastManager.showToastInfo("Tienes campos sin rellenar");
  }
  private getUnitCost(): number {
    return this.editModelForm.value.unitCost;
  }

  private getUnitsForm() {
    return this.editModelForm.value.unitsId[0];
  }

  private getAmount(): number {
    return this.editModelForm.value.amount;
  }

  private getRawMaterialName(): string {
    return this.editModelForm.value.nameRawMaterial;
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
          this._router.navigate(["/"+this.urlBack]);
        }
      })
    }else{
      this._router.navigate(["/"+this.urlBack]);
    }
  }
  private hasChanged():boolean{
    if(this.editModelForm.value.nameRawMaterial!=''){
      return true;
    }
    if(this.editModelForm.value.amount!=''){
      return true;
    }
    if(this.editModelForm.value.unitsId.length>0){
      return true;
    }
    if(this.editModelForm.value.unitCost!=''){
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
}
