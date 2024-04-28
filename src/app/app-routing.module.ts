import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/ui/login/login.component';
import { RegisterComponent } from './components/ui/register/register.component';
import { CategoriesComponent } from './components/ui/categories/categories.component';
import { TypeExpenseComponent } from './components/ui/type-expense/type-expense.component';
import { ExpenseComponent } from './components/ui/expense/expense.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register',component: RegisterComponent},
  { path: 'categories',component: CategoriesComponent},
  { path: 'typeExpenses',component:TypeExpenseComponent},
  { path: 'expenses',component:ExpenseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
