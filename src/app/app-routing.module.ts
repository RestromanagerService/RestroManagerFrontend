import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/ui/login/login.component';
import { RegisterComponent } from './components/ui/register/register.component';
import { CategoriesComponent } from './components/ui/categories/categories.component';
import { EditCategoriesComponent } from './components/ui/categories/edit-categories/edit-categories.component';
import { CreateCategoriesComponent } from './components/ui/categories/create-categories/create-categories.component';
import { StockcommercialproductsComponent } from './components/ui/stockcommercialproducts/stockcommercialproducts.component';
import { EditstockcommercialproductsComponent } from './components/ui/stockcommercialproducts/editstockcommercialproducts/editstockcommercialproducts.component';
import { CreatetockcommercialproductsComponent } from './components/ui/stockcommercialproducts/createtockcommercialproducts/createtockcommercialproducts.component';
import { StockRawMaterialsComponent } from './components/ui/stock-raw-materials/stock-raw-materials.component';
import { EditStockRawMaterialsComponent } from './components/ui/stock-raw-materials/edit-stock-raw-materials/edit-stock-raw-materials.component';
import { CreateStockRawMaterialsComponent } from './components/ui/stock-raw-materials/create-stock-raw-materials/create-stock-raw-materials.component';
import { RecipesComponent } from './components/ui/recipes/recipes.component';
import { RecipesDetailsComponent } from './components/ui/recipes/recipes-details/recipes-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',component: RegisterComponent},
  { path: 'categories',component: CategoriesComponent},
  { path: 'categories/edit/:id',component: EditCategoriesComponent},
  { path: 'categories/create',component: CreateCategoriesComponent},
  { path: 'stockCommercialProducts',component: StockcommercialproductsComponent},
  { path: 'stockCommercialProducts/edit/:id',component: EditstockcommercialproductsComponent},
  { path: 'stockCommercialProducts/create',component: CreatetockcommercialproductsComponent},
  { path: 'stockRawMaterials',component: StockRawMaterialsComponent},
  { path: 'stockRawMaterials/edit/:id',component: EditStockRawMaterialsComponent},
  { path: 'stockRawMaterials/create',component: CreateStockRawMaterialsComponent},
  { path: 'recipes',component: RecipesComponent},
  { path: 'recipes/details/:id',component: RecipesDetailsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
