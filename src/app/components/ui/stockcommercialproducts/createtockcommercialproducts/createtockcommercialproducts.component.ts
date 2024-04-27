import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICategory } from '../../../../domain/models/ICategory';
import { INewProductCategory, IProductCategory } from '../../../../domain/models/IProductCategory';
import { IUnits } from '../../../../domain/models/Iunits';
import { INewStockCommercialProducts, IStockCommercialProducts } from '../../../../domain/models/stock-commercial-products';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';
import Swal from 'sweetalert2';
import { ToastManager } from '../../../shared/alerts/toast-manager';
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
  editModelForm: FormGroup;
  urlRequest:string="StockCommercialProduct";
  urlBack:string="/stockCommercialProducts";
  idModel:string='';
  loading:boolean=true;
  errorNameProduct={error:true,message:'El nombre de producto es requerido'}
  errorCategoriesProduct={error:true,message:'Seleccione al menos una categoría'}
  errorAmount={error:true,message:'La cantidad es requerida'}
  errorUnitsId={error:true,message:'Seleccione la unidad de medida'}
  errorUnitCost={error:true,message:'El costo por unidad es requerido'}

  settingsCategories;
  settingsUnits;



  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private formBuilder: FormBuilder,
    private modelService:GenericService<INewStockCommercialProducts>,
    private categoryService:GenericService<ICategory>,
    private unitsService:GenericService<IUnits>){
      
    this.idModel=_routeData.snapshot.params['id'];
    this.editModelForm = new FormGroup({
      nameProduct: new FormControl('',Validators.required),
      categoriesProduct:new FormControl([],Validators.required),
      amount:new FormControl('',Validators.required),
      unitsId:new FormControl([],Validators.required),
      unitCost:new FormControl('',Validators.required),
    });
    this.settingsCategories = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar',
      allowSearchFilter: true
    
    }; 
    this.settingsUnits = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true
    }; 
    
  }
  
  ngOnInit(): void {
    this.getCategories().subscribe(dataCategory=>{
      this.categories=dataCategory.getResponse();
      this.getUnits().subscribe(dataUnits=>{
        this.units=dataUnits.getResponse();
        this.loading=false;
      })
    });
  }

  getCategories():Observable<HttpResponseWrapper<ICategory[]>>{
    return this.categoryService.getAll("Categories/full")
  }
  getUnits():Observable<HttpResponseWrapper<IUnits[]>>{
    return this.unitsService.getAll("Units/full")
  }
  updateModel(){
    if(this.validarErrores()){
        var updateModel:INewStockCommercialProducts=
        {
          product:{
            name:this.getProductName(),
            productCategories:this.categoryToProductCategory(this.getProductCategories())
          },
          aumount:this.getAmount(),
          unitsId:this.getUnitsForm().id,
          unitCost:this.getUnitCost()
        }
        this.modelService.put(updateModel,this.urlRequest).subscribe();
        this._router.navigate(["/"+this.urlBack])
        ToastManager.showToastSuccess("Actualización exitosa")
        return
    }else{
      ToastManager.showToastWarning("Tienes campos sin rellenar")
    }
      

  }
  private validarErrores():boolean{
    if(this.editModelForm.get('nameProduct')!.errors){
      return false;
    }
    if(this.editModelForm.get('categoriesProduct')!.errors){
      return false;
    }
    if(this.editModelForm.get('amount')!.errors){
      return false;
    }
    if(this.editModelForm.get('amount')!.errors){
      return false;
    }
    if(this.editModelForm.get('unitCost')!.errors){
      return false;
    }
    return true;
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
  private getProductName(): string {
    return this.editModelForm.value.nameProduct;
  }

  private getProductCategories(): ICategory[] {
    return this.editModelForm.value.categoriesProduct;
  }

  private categoryToProductCategory(categorias:ICategory[]):INewProductCategory[]{
    return categorias.map(c=>{
      let category:INewProductCategory={categoryId:c.id};
      return category;
    });
  }
}
