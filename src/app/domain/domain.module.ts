import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryUseCase } from './usecases/category/category.usecase';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],providers:[
    CategoryUseCase
  ]
})
export class DomainModule { }
