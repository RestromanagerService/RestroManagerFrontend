import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { IProductRecipe } from '../../../../domain/models/interfaces/Iproduct';
import { ProductType } from '../../../../domain/models/enums/user-type';
import { ICategory } from '../../../../domain/models/interfaces/ICategory';
import { INewProductCategory } from '../../../../domain/models/interfaces/IProductCategory';
import { GenericService } from '../../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent {
  createModelForm: FormGroup;
  settingsCategories;
  categories:ICategory[]=[];
  imageBase64?:string;
  @Output() createRecipeEvent = new EventEmitter<void>();

  constructor(
    private _router: Router,
    private _routeData: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: GenericService
  ) {
    this.createModelForm = this.formBuilder.group({
      name: ['', Validators.required],
      productionCost:[0,[Validators.min(0),Validators.required]],
      categoriesF:[[]],
      price:[0,[Validators.min(0),Validators.required]],
      description:['',Validators.required],
      photo:['',Validators.required]
    });
    this.settingsCategories = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar',
      allowSearchFilter: true
    
    }; 
  }

  ngOnInit(): void {
    this.service.getAll<ICategory>("categories/full").subscribe(data=>{
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      this.categories=data.getResponse()!;

    })
  }
  saveModel() {
    if (this.createModelForm.valid) {
      var saveModel: IProductRecipe = {
        name: this.createModelForm.value.name,
        productType: ProductType.Recipe,
        productionCost: this.createModelForm.get('productionCost')?.value,
        productCategories:this.categoryToProductCategory(this.createModelForm.get('categoriesF')?.value),
        price:this.createModelForm.get('price')?.value,
        description:this.createModelForm.get('price')?.value,
        photo:this.imageBase64
      };
      this.service
        .post<IProductRecipe, IProductRecipe>(saveModel, 'products/')
        .subscribe((data) => {
          if (data.getError()) {
            ToastManager.showToastError(data.getResponseMessage());
          } else {
            ToastManager.showToastSuccess('Registro exitoso');
            this.createRecipeEvent.emit();
            this.createModelForm.get('name')?.setValue('');
            this.createModelForm.get('productionCost')?.setValue(0);
            this.createModelForm.get('categoriesF')?.setValue([]);
          }
        });
      return;
    }
    ToastManager.showToastInfo('Hay campos sin rellenar');
  }
  private categoryToProductCategory(categorias:ICategory[]):INewProductCategory[]{
    return categorias.map(c=>{
      let category:INewProductCategory={categoryId:c.id};
      return category;
    });
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
