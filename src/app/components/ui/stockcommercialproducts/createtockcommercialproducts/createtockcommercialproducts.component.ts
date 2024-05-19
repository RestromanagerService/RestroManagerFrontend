import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { IUnits } from '../../../../domain/models/Iunits';
import { ICategory } from '../../../../domain/models/interfaces/ICategory';
import { INewProductCategory } from '../../../../domain/models/interfaces/IProductCategory';
import { INewStockCommercialProducts } from '../../../../domain/models/stock-commercial-products';
import { ProductType } from '../../../../domain/models/enums/user-type';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';
const Toast = Swal.mixin({
  toast: true,
  animation: false,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
@Component({
  selector: 'app-createtockcommercialproducts',
  templateUrl: './createtockcommercialproducts.component.html',
  styleUrl: './createtockcommercialproducts.component.css'
})
export class CreatetockcommercialproductsComponent {
  categories:ICategory[]=[];
  units:IUnits[]=[];
  createModelForm: FormGroup;
  urlRequest:string="StockCommercialProduct";
  urlBack:string="/stockCommercialProducts";
  idModel:string='';
  loading:boolean=true;

  settingsCategories={
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Seleccionar todas',
    unSelectAllText: 'Deseleccionar',
    allowSearchFilter: true
  
  };
  settingsUnits={
    singleSelection: true,
    idField: 'id',
    textField: 'name',
    allowSearchFilter: true
  }; 



  constructor(private _router:Router,
    private service:GenericService){
    this.createModelForm = new FormGroup({
      nameProduct: new FormControl('',Validators.required),
      categoriesProduct:new FormControl([],Validators.required),
      amount:new FormControl('',Validators.required),
      unitsId:new FormControl([],Validators.required),
      unitCost:new FormControl('',Validators.required),
    });
    
  }
  
  ngOnInit(): void {
    this.getCategories().subscribe(dataCategory=>{
      if(dataCategory.getError()){
        this.navigateUrlBack();
        ToastManager.showToastError(dataCategory.getResponseMessage());
        return;
      }
      this.categories=dataCategory.getResponse()!;
      this.getUnits().subscribe(dataUnits=>{
        if(dataUnits.getError()){
          this.navigateUrlBack();
          ToastManager.showToastError(dataUnits.getResponseMessage());
          return;
        }
        this.units=dataUnits.getResponse()!;
        this.loading=false;
      })
    });
  }

  getCategories():Observable<HttpResponseWrapper<ICategory[]>>{
    return this.service.getAll<ICategory>("Categories/full")
  }
  getUnits():Observable<HttpResponseWrapper<IUnits[]>>{
    return this.service.getAll<IUnits>("Units/full")
  }
  saveModel(){
    if(this.validarErrores()){
        var updateModel:INewStockCommercialProducts=
        {
          product:{
            name:this.getProductName(),
            productCategories:this.categoryToProductCategory(this.getProductCategories()),
            productType:ProductType.Commercial
          },
          aumount:this.getAmount(),
          unitsId:this.getUnitsForm().id,
          unitCost:this.getUnitCost()
        }
        this.service.post<INewStockCommercialProducts,INewStockCommercialProducts>(updateModel,this.urlRequest).subscribe(data=>{
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
    if(this.createModelForm.value.nameProduct!=''){
      return true;
    }
    if(this.createModelForm.value.categoriesProduct.length>0){
      return true;
    }
    if(this.createModelForm.value.amount!=''){
      return true;
    }
    if(this.createModelForm.value.unitsId.length>0){
      return true;
    }
    if(this.createModelForm.value.unitCost!=''){
      return true;
    }
    return false;
  }
  private validarErrores():boolean{
    if(this.createModelForm.get('nameProduct')!.errors){
      return false;
    }
    if(this.createModelForm.get('categoriesProduct')!.errors){
      return false;
    }
    if(this.createModelForm.get('amount')!.errors){
      return false;
    }
    if(this.createModelForm.get('unitsId')!.errors){
      return false;
    }
    if(this.createModelForm.get('unitCost')!.errors){
      return false;
    }
    return true;
  }
  private getUnitCost(): number {
    return this.createModelForm.value.unitCost;
  }

  private getUnitsForm() {
    return this.createModelForm.value.unitsId[0];
  }

  private getAmount(): number {
    return this.createModelForm.value.amount;
  }
  private getProductName(): string {
    return this.createModelForm.value.nameProduct;
  }

  private getProductCategories(): ICategory[] {
    return this.createModelForm.value.categoriesProduct;
  }

  private categoryToProductCategory(categorias:ICategory[]):INewProductCategory[]{
    return categorias.map(c=>{
      let category:INewProductCategory={categoryId:c.id};
      return category;
    });
  }
  private navigateUrlBack(){
    this._router.navigate(["/"+this.urlBack]);
  }
}
