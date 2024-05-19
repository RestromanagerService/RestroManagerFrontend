import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  IProduct,
  IProductRecipe,
} from '../../../../domain/models/interfaces/Iproduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { ICategory } from '../../../../domain/models/interfaces/ICategory';
import { Observable } from 'rxjs';
import { ProductType } from '../../../../domain/models/enums/user-type';
import { IProductCategory } from '../../../../domain/models/interfaces/IProductCategory';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css',
})
export class EditRecipeComponent implements OnChanges {
  @Input() idRecipe: string = '';
  @Output() updateRecipeEvent = new EventEmitter<void>();
  recipe!: IProduct;
  editModelForm: FormGroup;
  settingsCategories;
  categories: ICategory[] = [];
  loading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private service: GenericService
  ) {
    this.editModelForm = this.formBuilder.group({
      nameE: ['', Validators.required],
      productionCostE: [0, [Validators.min(0), Validators.required]],
      categoriesE: [[]],
    });
    this.settingsCategories = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Seleccionar todas',
      unSelectAllText: 'Deseleccionar',
      allowSearchFilter: true,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    this.service
      .getById<IProduct>('products/', this.idRecipe)
      .subscribe((data) => {
        if (data.getError()) {
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        this.recipe = data.getResponse()!;
        this.getCategories().subscribe((dataCategory) => {
          if (dataCategory.getError()) {
            ToastManager.showToastError(dataCategory.getResponseMessage());
            return;
          }
          this.categories = dataCategory.getResponse()!;
          let categoriesP: ICategory[] = [];
          this.recipe.productCategories?.forEach((p) =>
            categoriesP.push(p.category)
          );
          this.editModelForm.controls['categoriesE'].setValue(categoriesP);
          this.editModelForm.controls['nameE'].setValue(this.recipe.name);
          this.editModelForm.controls['productionCostE'].setValue(this.recipe.productionCost);
          this.loading = false;
        });
      });
  }
  saveModel() {
    if (this.editModelForm.valid) {
      var saveModel: IProductRecipe = {
        id:this.recipe.id,
        name: this.editModelForm.get('nameE')?.value,
        productType: ProductType.Recipe,
        productionCost: this.editModelForm.get('productionCostE')?.value,
        productCategories:this.categoryToProductCategory(this.editModelForm.get('categoriesE')?.value,this.recipe.id)
      };
      this.service
        .put<IProductRecipe, IProductRecipe>(
          saveModel,
          "products/"
        )
        .subscribe((data) => {
          if (data.getError()) {
            ToastManager.showToastError(data.getResponseMessage());
            return;
          }
          this.updateRecipeEvent.emit();
          ToastManager.showToastSuccess('Actualización exitosa');
        });
      return;
    }
    ToastManager.showToastInfo('No has realizado modificaciones');
  }
  getCategories(): Observable<HttpResponseWrapper<ICategory[]>> {
    return this.service.getAll<ICategory>('Categories/full');
  }
  private categoryToProductCategory(categorias:ICategory[],productId:string):IProductCategory[]{
    return categorias.map(c=>{
      let category:IProductCategory={categoryId:c.id,productId:productId,category:c};
      return category;
    });
  }
}
