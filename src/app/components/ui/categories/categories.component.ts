import { Component, OnInit } from '@angular/core';
import { IWithName } from '../../../domain/models/IWithName';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoryUseCase } from '../../../domain/usecases/category/category.usecase';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  
  categorias:IWithName[]=[];

  constructor(private categoryUseCase:CategoryUseCase) {

  }

  ngOnInit(): void {
      this.categoryUseCase.getAllCategories().subscribe(data=>this.categorias=data)
  }

}
