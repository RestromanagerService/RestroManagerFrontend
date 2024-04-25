import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/ui/login/login.component';
import { RegisterComponent } from './components/ui/register/register.component';
import { CategoriesComponent } from './components/ui/categories/categories.component';
import { EditCategoriesComponent } from './components/ui/categories/edit-categories/edit-categories.component';
import { CreateCategoriesComponent } from './components/ui/categories/create-categories/create-categories.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',component: RegisterComponent},
  { path: 'categories',component: CategoriesComponent},
  { path: 'categories/edit/:id',component: EditCategoriesComponent},
  { path: 'categories/create',component: CreateCategoriesComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
