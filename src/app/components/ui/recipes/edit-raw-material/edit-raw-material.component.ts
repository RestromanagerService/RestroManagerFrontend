import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUnits } from '../../../../domain/models/Iunits';
import { IProductFoods, IFood, IFoodRawMaterials } from '../../../../domain/models/interfaces/Iproduct';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { GenericService } from '../../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-edit-raw-material',
  templateUrl: './edit-raw-material.component.html',
  styleUrl: './edit-raw-material.component.css'
})
export class EditRawMaterialComponent {
  @Input() foodRawMaterialsId:string="";
  @Input() recipeId:string="";
  @Input() foodId:string="";
  editForm!: FormGroup;
  units:IUnits[]=[]
  loading:boolean=true;
  foodRawMaterial!:IFoodRawMaterials;
  @Output() updateSuccess = new EventEmitter<void>();
  constructor(private _router:Router,private formBuilder: FormBuilder, private service: GenericService){
    this.buildForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.foodRawMaterialsId!=""){
      this.service.getById<IFoodRawMaterials>("foodRawMaterial/",this.foodRawMaterialsId).subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          this.navigateUrlBack();
          return;
        }
        this.foodRawMaterial=data.getResponse()!;
        this.service.getAll<IUnits>("Units/full").subscribe(data=>{
          if(data.getError()){
            ToastManager.showToastError(data.getResponseMessage());
            return;
          }
          this.units=data.getResponse()!;
          this.editForm.get("ammount")?.setValue(this.foodRawMaterial.amount);
          this.editForm.get("units")?.setValue(this.foodRawMaterial.unitsId);
          this.loading=false;
        });
      });
    }
    
  }
  private navigateUrlBack() {
    this._router.navigate(["/recipe/"+this.recipeId+"/food/rawMaterials/" + this.foodId]);
  }

  editProductFood(){
    if(this.editForm.valid){
      let rawMaterialEdit:IFoodRawMaterials={
        id:this.foodRawMaterial.id,
        amount:this.editForm.get("ammount")?.value,
        unitsId:this.editForm.get("units")?.value,
        rawMaterialId:this.foodRawMaterial.rawMaterialId,
        foodId:this.foodRawMaterial.foodId
      };
      if(this.isChange(rawMaterialEdit)){
        this.service.put<IFoodRawMaterials,IFoodRawMaterials>(rawMaterialEdit,"foodRawMaterial/").subscribe(data=>{
          this.navigateUrlBack();
          if(data.getError()){
            ToastManager.showToastError(data.getResponseMessage());
            return;
          }
          ToastManager.showToastSuccess("Actualización exitosa");
          this.updateSuccess.emit();
        });
        return;
      }
      ToastManager.showToastInfo("No hay cambios por guardar");
    }

  }
  buildForm(){
    this.editForm = this.formBuilder.group({
      ammount:new FormControl(0,[Validators.min(0.001),Validators.required]),
      units:new FormControl('',Validators.required),
    }
    );
  }
  isChange(foodRawMaterialEdit:IFoodRawMaterials):boolean{
    if(foodRawMaterialEdit.amount!=this.foodRawMaterial.amount){
      return true;
    }
    if(foodRawMaterialEdit.unitsId!=this.foodRawMaterial.unitsId){
      return true;
    }
    return false;
  }

}
