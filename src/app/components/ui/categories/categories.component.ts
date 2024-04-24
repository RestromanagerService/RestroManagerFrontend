import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../domain/models/ICategory';
import { GenericService } from '../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  
  categorias:ICategory[]=[];
  totalPages:number=1;

  constructor(private categoryService:GenericService<ICategory>) {

  }

  ngOnInit(): void {
    this.categoryService.getAll("categories/").subscribe(data=>this.categorias=data.getResponse())
    this.categoryService.getTotalPages("categories/").subscribe(data=>this.totalPages=data.getResponse())
  }

}
