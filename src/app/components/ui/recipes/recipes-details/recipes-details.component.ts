import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { IProductRecipe, IProductFoods } from '../../../../domain/models/interfaces/Iproduct';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { FormGroup } from '@angular/forms';
import { DrawerComponent } from '../../../shared/drawer/drawer.component';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';


@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrl: './recipes-details.component.css'
})
export class RecipesDetailsComponent implements OnInit {
  loading:boolean=true;
  model?:IProductRecipe;
  foods:IProductFoods[]=[];
  idModel:string='';
  productFoodToEdit="";
  @ViewChild('editFoodModal') editFoodModal!: ModalComponent;
  @ViewChild('addFoodsDrawer') addFoodsDrawer!: DrawerComponent;
  @ViewChild('createFoodModal') createFoodModal!: ModalComponent;


  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private service:GenericService){

    this.idModel=_routeData.snapshot.params['id'];
    
  }
  
  ngOnInit(): void {
    this.getModelById().subscribe(data=>
    {
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      this.model=data.getResponse()!;
      this.foods=this.model.productFoods;
      this.loading=false;
      
    })
    
  }
  deleteProductFood(id:string){
    this.service.delete(id,"productFood/").subscribe(data=>{
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      ToastManager.showToastSuccess("Eliminación exitosa");
      this.ngOnInit();
    })
  }

  getModelById():Observable<HttpResponseWrapper<IProductRecipe>>{
    return this.service.getById<IProductRecipe>("products/",this.idModel)
  }
  openEditFoodModal(editId:string){
    this.productFoodToEdit=editId;
    this.editFoodModal.openModal();
  }
  openCreateFoodModal(){
    this.createFoodModal.openModal();
  }
  openAddFoodsDrawer(){
    this.addFoodsDrawer.openDrawer();
  }
  updateSuccess(){
    this.editFoodModal.closeModal();
    this.ngOnInit();
  }
  addFood(){
    this.ngOnInit();
  }
  createSuccess(){
    this.createFoodModal.closeModal();
    this.ngOnInit();
  }
}
