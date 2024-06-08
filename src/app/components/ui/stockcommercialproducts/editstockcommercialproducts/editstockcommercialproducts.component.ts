import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { IStockCommercialProducts } from '../../../../domain/models/interfaces/stock-commercial-products';
import { IUnits } from '../../../../domain/models/Iunits';
import { ICategory } from '../../../../domain/models/interfaces/ICategory';
import { IProductCategory } from '../../../../domain/models/interfaces/IProductCategory';
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
  selector: 'app-editstockcommercialproducts',
  templateUrl: './editstockcommercialproducts.component.html',
  styleUrl: './editstockcommercialproducts.component.css'
})
export class EditstockcommercialproductsComponent {
  model!:IStockCommercialProducts;
  categories:ICategory[]=[];
  units:IUnits[]=[];
  editModelForm: FormGroup;
  urlRequest:string="StockCommercialProduct";
  urlBack:string="/stockCommercialProducts";
  idModel:string='';
  loading:boolean=true;
  imageBase64?:string;

  settingsCategories;
  settingsUnits;



  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private formBuilder: FormBuilder,
    private service:GenericService){
      
    this.idModel=_routeData.snapshot.params['id'];
    this.editModelForm = new FormGroup({
      nameProduct: new FormControl('',[Validators.required]),
      categoriesProduct:new FormControl([]),
      amount:new FormControl('',[Validators.required]),
      unitsId:new FormControl([],[Validators.required]),
      unitCost:new FormControl(0,[Validators.required]),
      description:new FormControl('',[Validators.required]),
      photo:new FormControl(''),
      price:new FormControl(0,[Validators.required])
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
    this.getModelById().subscribe(dataModel=>{
      if(dataModel.getError()){
        this.navigateUrlBack();
        ToastManager.showToastError(dataModel.getResponseMessage());
        return;
      }
      this.model=dataModel.getResponse()!;
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
          this.editModelForm.controls['nameProduct'].setValue(this.model.product.name);
          let categoriesP:ICategory[]=[];
          this.model.product.productCategories?.forEach(p=>categoriesP.push(p.category));
          this.editModelForm.controls['categoriesProduct'].setValue(categoriesP);
          this.editModelForm.controls['amount'].setValue(this.model.aumount);
          let units:IUnits[]=[];
          units.push({id:this.model.unitsId,name:this.model.units?.name});
          this.editModelForm.controls['unitsId'].setValue(units);
          this.editModelForm.controls['unitCost'].setValue(this.model.unitCost);
          this.editModelForm.controls['description'].setValue(this.model.product.description)
          this.editModelForm.controls['photo'].setValue(this.model.product.photo)
          this.editModelForm.controls['price'].setValue(this.model.product.price)
          this.loading=false;
        })
        });  
   })
  }

  getModelById():Observable<HttpResponseWrapper<IStockCommercialProducts>>{
    return this.service.getById<IStockCommercialProducts>(this.urlRequest+"/",this.idModel)
  }
  getCategories():Observable<HttpResponseWrapper<ICategory[]>>{
    return this.service.getAll<ICategory>("Categories/full")
  }
  getUnits():Observable<HttpResponseWrapper<IUnits[]>>{
    return this.service.getAll<IUnits>("Units/full")
  }
  updateModel(){
    if(this.hasChanged())
    {
      var updateModel:IStockCommercialProducts=
      {
        id:this.idModel,
        productId:this.model.product.id,
        product:{
          id:this.model.product.id,
          name:this.editModelForm.value.nameProduct,
          productType:ProductType.Commercial,
          productCategories:this.categoryToProductCategory(this.editModelForm.value.categoriesProduct,this.model.product.id),
          price:this.editModelForm.get("price")?.value,
          description:this.editModelForm.get("description")?.value,
          photo:(this.imageBase64==undefined)?this.model.product.photo:this.imageBase64
        },
        aumount:this.editModelForm.value.amount,
        unitsId:this.editModelForm.value.unitsId[0].id,
        unitCost:this.editModelForm.value.unitCost,
      }
      this.service.put<IStockCommercialProducts,IStockCommercialProducts>(updateModel,this.urlRequest).subscribe(data=>{
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
    if(this.editModelForm.value.nameProduct!=this.model.product.name){
      return true;
    }
    if(!this.validateCategories(this.editModelForm.value.categoriesProduct,this.model.product.productCategories)){
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
    if(this.editModelForm.value.description!=this.model.product.description){
      return true;
    }
    if(this.editModelForm.value.price!=this.model.product.price){
      return true;
    }
    if(this.imageBase64!=undefined){
      return true;
    }
    return false;
  }
  private categoryToProductCategory(categorias:ICategory[],productId:string):IProductCategory[]{
    return categorias.map(c=>{
      let category:IProductCategory={categoryId:c.id,productId:productId,category:c};
      return category;
    });
  }
  private validateCategories(categoriesFromForm: ICategory[], productCategories: IProductCategory[]): boolean {
    if (categoriesFromForm.length !== productCategories.length) {
        return false;
    }
    const formCategoriesIds = categoriesFromForm.map(category => category.id);
    const modelCategoriesIds = productCategories.map(productCategory => productCategory.categoryId);
    const allCategoriesIncluded = formCategoriesIds.every(id => modelCategoriesIds.includes(id));
    return allCategoriesIncluded;
  }
  private navigateUrlBack(){
    this._router.navigate(["/"+this.urlBack]);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (file) {
      if (allowedTypes.indexOf(file.type) === -1) {
        ToastManager.showToastError("Tipo de archivo "+file.type+" no permitido");
        event.target.value = null;
        return
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64=reader.result as string;
        this.imageBase64=this.imageBase64.split(',',2)[1];
      };
      reader.onerror = (error) => {
        ToastManager.showToastError("Ocurrió un error al procesar la fotografía")
      };
      return;
    }
    this.imageBase64=undefined;
  }
}
