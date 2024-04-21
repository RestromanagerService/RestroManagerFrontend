import { Component, OnInit } from '@angular/core';
import { Category } from '../../../domain/models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  private CATEGORY_URL_BASE: string = "https://localhost:7056/api/Categories"; 

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  });

  
  categorias:Category[]=[];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
      this.http.get<Category[]>(this.CATEGORY_URL_BASE,{headers: this.httpHeaders})
      .subscribe(data=>this.categorias=data)
  }

}
