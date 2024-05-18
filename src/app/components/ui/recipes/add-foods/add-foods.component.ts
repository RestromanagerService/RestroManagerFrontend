import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFood, IProductFoods } from '../../../../domain/models/interfaces/Iproduct';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { IUnits } from '../../../../domain/models/Iunits';
import { Observable } from 'rxjs';
import { BuildPagination } from '../../../../domain/models/pagination';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';

@Component({
  selector: 'app-add-foods',
  templateUrl: './add-foods.component.html',
  styleUrl: './add-foods.component.css'
})
export class AddFoodsComponent implements OnInit {
  foods:IFood[]=[];
  units:IUnits[]=[];
  valueSearch:string="";
  @Input() productId:string="";
  @Output() addFoodEvent = new EventEmitter<void>();
  constructor(private service:GenericService){
  }
  ngOnInit(): void {
    if(this.valueSearch==""){
      this.service.getAll<IFood>("foods/full").subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        this.foods=data.getResponse()!;
        this.getUnits().subscribe(data=>{
          if(!data.getError()){
            this.units=data.getResponse()!;
          }
        })
      });
    }else{
      let pagination=BuildPagination.build('',20,1,this.valueSearch);
      this.service.getAll<IFood>("foods",pagination).subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        this.foods=data.getResponse()!;
        this.getUnits().subscribe(data=>{
          if(!data.getError()){
            this.units=data.getResponse()!;
          }
        })
      });
    }
  }
  addFood(food:IFood){
    const amount = parseInt((<HTMLInputElement>document.getElementById('amount-' + food.id)).value);
    const unitsID = (<HTMLSelectElement>document.getElementById('unit-' + food.id)).value;
    if(amount<=0){
      ToastManager.showToastError("La cantidad debe ser mayor a cero");
      return;
    }
    let productFood:IProductFoods={
      amount:amount,
      unitsId:unitsID,
      foodId:food.id!,
      productId:this.productId
    }
    this.service.post<IProductFoods,IProductFoods>(productFood,"productFood/").subscribe(data=>{
      if(data.getError()){
        if(data.getResponseMessage().includes("Ya existe")){
          ToastManager.showToastError("El alimento ya está incluido en la receta");
          return;
        }
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      ToastManager.showToastSuccess("Se ha añadido el alimento");
      this.addFoodEvent.emit();
    })
  }
  getUnits():Observable<HttpResponseWrapper<IUnits[]>>{
    return this.service.getAll<IUnits>("Units/full")
  }
  getChangeValueSearch(valueSearch:string){
    this.valueSearch=valueSearch;
    this.ngOnInit();
  }

}
