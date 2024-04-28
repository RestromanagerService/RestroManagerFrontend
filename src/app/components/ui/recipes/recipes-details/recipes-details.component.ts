import { Component, OnInit } from '@angular/core';
import { IProductFoods, IProductRecipe } from '../../../../domain/models/Iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { Observable } from 'rxjs';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css'
})
export class RecipesDetailsComponent implements OnInit {
  loading:boolean=true;
  model?:IProductRecipe;
  alimentos:IProductFoods[]=[];
  idModel:string='';


  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private recipesService:GenericService<IProductRecipe>){

    this.idModel=_routeData.snapshot.params['id'];
    
  }
  
  ngOnInit(): void {
    this.getModelById().subscribe(data=>
    {
      this.model=data.getResponse();
      console.log(this.model.productFoods)
      this.alimentos=this.model.productFoods;
      this.loading=false;
      
    })
    
  }

  getModelById():Observable<HttpResponseWrapper<IProductRecipe>>{
    return this.recipesService.getById("products/",this.idModel)
  }
}
