import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryUseCase } from './usecases/category/category.usecase';
import { TypeExpenseUseCase } from './usecases/type-expense/type-expense.usecase';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],providers:[
    CategoryUseCase,
    TypeExpenseUseCase
  ]
})
export class DomainModule { }
