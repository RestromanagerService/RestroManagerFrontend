import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { TypeExpenseComponent } from './components/ui/type-expense/type-expense.component';
import { ExpenseComponent } from './components/ui/expense/expense.component';
import { RegisterUserComponent } from './components/ui/user/register-user/register-user.component';
import { ConfirmEmailComponent } from './components/ui/user/confirm-email/confirm-email.component';

import { EditUserComponent } from './components/ui/user/edit-user/edit-user.component';
import { WelcomeComponent } from './components/ui/welcome/welcome.component';
import { ResetPasswordComponent } from './components/ui/user/reset-password/reset-password.component';
import { UserGuard } from './security/guards/user.guard';
import { AdminGuard } from './security/guards/admin.guard';
import { GuestGuard } from './security/guards/guest.guard';
import { CountriesComponent } from './components/ui/countries/countries.component';
import { StatesByCountryComponent } from './components/ui/countries/states-by-country/states-by-country.component';
import { CitiesByStateComponent } from './components/ui/countries/cities-by-state/cities-by-state.component';
import { AddCityComponent } from './components/ui/countries/add-city/add-city.component';
import { EditCityComponent } from './components/ui/countries/edit-city/edit-city.component';
import { ChangePasswordComponent } from './components/ui/user/change-password/change-password.component';
import { FoodsDetailsComponent } from './components/ui/recipes/foods-details/foods-details.component';
import { LoginComponent } from './components/ui/user/login/login.component';

const routes: Routes = [
  { path: '',component: WelcomeComponent},
  { path: 'categories',component: CategoriesComponent, canActivate:[AdminGuard]},
  { path: 'categories/edit/:id',component: EditCategoriesComponent,canActivate:[AdminGuard]},
  { path: 'categories/create',component: CreateCategoriesComponent,canActivate:[AdminGuard]},
  { path: 'stockCommercialProducts',component: StockcommercialproductsComponent},
  { path: 'stockCommercialProducts/edit/:id',component: EditstockcommercialproductsComponent},
  { path: 'stockCommercialProducts/create',component: CreatetockcommercialproductsComponent},
  { path: 'stockRawMaterials',component: StockRawMaterialsComponent},
  { path: 'stockRawMaterials/edit/:id',component: EditStockRawMaterialsComponent},
  { path: 'stockRawMaterials/create',component: CreateStockRawMaterialsComponent},
  { path: 'recipes',component: RecipesComponent},
  { path: 'recipes/details/:id',component: RecipesDetailsComponent},
  { path: 'recipe/:idRecipe/food/rawMaterials/:id',component: FoodsDetailsComponent},
  { path: 'typeExpenses',component:TypeExpenseComponent},
  { path: 'expenses',component:ExpenseComponent},
  { path: 'register',component: RegisterUserComponent},
  { path: 'user/confirmEmail',component: ConfirmEmailComponent},
  { path: 'user/edit',component: EditUserComponent},
  { path: 'user/resetPassword',component: ResetPasswordComponent},
  { path: 'user/changePassword', component:ChangePasswordComponent},
  { path: 'countries', component:CountriesComponent},
  { path: 'country/states/:id', component:StatesByCountryComponent},
  { path: 'state/:idCountry/cities/:idState', component:CitiesByStateComponent},
  { path: 'cities/:idCountry/create/:id', component:AddCityComponent},
  { path: 'city/edit/:idCountry/:idState/:idCity', component:EditCityComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
