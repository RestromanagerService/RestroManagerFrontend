import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { IUnits } from '../../../../domain/models/Iunits';
import { IFood, IProductFoods } from '../../../../domain/models/interfaces/Iproduct';
import { GenericService } from '../../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-edit-product-food',
  templateUrl: './edit-product-food.component.html',
  styleUrl: './edit-product-food.component.css'
})
export class EditProductFoodComponent implements OnChanges{
  @Input() productFoodId:string="";
  @Input() recipeId:string="";
  editForm!: FormGroup;
  imageBase64?:string;
  units:IUnits[]=[]
  loading:boolean=true;
  productFood!:IProductFoods;
  @Output() updateSuccess = new EventEmitter<void>();
  constructor(private _router:Router,private formBuilder: FormBuilder, private service: GenericService){
    this.buildForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.productFoodId!=""){
      this.resetForm();
      this.imageBase64=undefined;
      this.service.getById<IProductFoods>("productFood/",this.productFoodId).subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          this.navigateUrlBack();
          return;
        }
        this.productFood=data.getResponse()!;
        this.service.getAll<IUnits>("Units/full").subscribe(data=>{
          if(data.getError()){
            ToastManager.showToastError(data.getResponseMessage());
            return;
          }
          this.units=data.getResponse()!;
          this.editForm.get("ammount")?.setValue(this.productFood.amount);
          this.editForm.get("units")?.setValue(this.productFood.unitsId);
          this.editForm.get("nameFood")?.setValue(this.productFood.food?.name);
          this.editForm.get("productionCost")?.setValue(this.productFood.food?.productionCost);
          this.loading=false;
        });
      });
    }
    
  }
  private navigateUrlBack() {
    this._router.navigate(["/recipes/details/" + this.recipeId]);
  }

  editProductFood(){
    if(this.editForm.valid){
      let editFood:IFood={
        id:this.productFood.foodId,
        name:this.editForm.get("nameFood")?.value,
        productionCost:this.editForm.get("productionCost")?.value,
        photo:(this.imageBase64==undefined)?this.productFood.food?.photo:this.imageBase64,
      };
      let productFoodEdit:IProductFoods={
        id:this.productFood.id,
        amount:this.editForm.get("ammount")?.value,
        unitsId:this.editForm.get("units")?.value,
        foodId:this.productFood.foodId,
        food:editFood,
        productId:this.productFood.productId
      };
      if(this.isChange(productFoodEdit)){
        this.service.put<IProductFoods,IProductFoods>(productFoodEdit,"productFood/").subscribe(data=>{
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
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.indexOf(file.type) === -1) {
      ToastManager.showToastError("Tipo de archivo "+file.type+" no permitido");
      event.target.value = null;
      return
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64=reader.result as string;
        this.imageBase64=this.imageBase64.split(',',2)[1];
      };
      reader.onerror = (error) => {
        ToastManager.showToastError("Ocurrió un error al procesar la fotografía")
      };
    }
  }
  buildForm(){
    this.editForm = this.formBuilder.group({
      ammount:new FormControl(1,[Validators.pattern("^[+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?$"),Validators.required]),
      units:new FormControl('',Validators.required),
      nameFood:new FormControl('',Validators.required),
      photo:new FormControl(),
      productionCost:new FormControl(0,Validators.required),}
    );
  }
  resetForm(){
    this.editForm.get("ammount")?.setValue(1);
    this.editForm.get("units")?.setValue('');
    this.editForm.get("nameFood")?.setValue('');
    this.editForm.get("productionCost")?.setValue(0);
  }
  isChange(productFoodEdit:IProductFoods):boolean{
    if(productFoodEdit.amount!=this.productFood.amount){
      return true;
    }
    if(productFoodEdit.unitsId!=this.productFood.unitsId){
      return true;
    }
    if(productFoodEdit.food?.name!=this.productFood.food?.name){
      return true;
    }
    if(productFoodEdit.food?.productionCost!=this.productFood.food?.productionCost){
      return true;
    }
    if(this.imageBase64!=undefined){
      return true;
    }
    return false;
  }
}
