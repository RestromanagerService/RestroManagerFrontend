import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { IUnits } from "../../../../domain/models/Iunits";
import { INewStockRawMaterials } from "../../../../domain/models/interfaces/stock-raw-materials";
import { ToastManager } from "../../../shared/alerts/toast-manager";
import { HttpResponseWrapper } from "../../../../infraestructure/generic/http-response-wrapper";
import { GenericService } from "../../../../infraestructure/generic/generic-service";


@Component({
  selector: 'app-create-stock-raw-materials',
  templateUrl: './create-stock-raw-materials.component.html',
  styleUrl: './create-stock-raw-materials.component.css'
})
export class CreateStockRawMaterialsComponent {
  private URL_REQUEST:string="StockRawMaterial";
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
    private service:GenericService){
    this.editModelForm = new FormGroup({
      nameRawMaterial: new FormControl('',Validators.required),
      amount:new FormControl('',Validators.required),
      unitsId:new FormControl([],Validators.required),
      unitCost:new FormControl('',Validators.required),
    });
  }
  
  ngOnInit(): void {
    this.getUnits().subscribe(dataUnits=>{
      if(dataUnits.getError()){
        this.navigateUrlBack();
        ToastManager.showToastError(dataUnits.getResponseMessage());
        return;
      }
      this.units=dataUnits.getResponse()!;
      this.loading=false;
    })
  }

  getUnits():Observable<HttpResponseWrapper<IUnits[]>>{
    return this.service.getAll<IUnits>("Units/full")
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
      this.service.post<INewStockRawMaterials,INewStockRawMaterials>(saveModel,this.URL_REQUEST).subscribe(data=>{
        if(data.getError()){
          this.navigateUrlBack();
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        this.navigateUrlBack();
        ToastManager.showToastSuccess("Registro exitoso");
      });
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
          this.navigateUrlBack();
        }
      })
    }else{
      this.navigateUrlBack();
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
  private navigateUrlBack(){
    this._router.navigate(["/"+this.urlBack]);
  }
}
