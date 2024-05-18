import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IProductRecipe, IProductFoods, IFood, IFoodRawMaterials } from '../../../../domain/models/interfaces/Iproduct';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { DrawerComponent } from '../../../shared/drawer/drawer.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { IRawMaterial } from '../../../../domain/models/interfaces/IRawMaterial';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';

@Component({
  selector: 'app-foods-details',
  templateUrl: './foods-details.component.html',
  styleUrl: './foods-details.component.css'
})
export class FoodsDetailsComponent {
  loading:boolean=true;
  model?:IFood;
  rawMaterials:IFoodRawMaterials[]=[];
  idFood:string='';
  idRecipe:string='';
  foodRawMaterialsToEdit="";
  @ViewChild('editRawMaterialModal') editRawMaterialModal!: ModalComponent;
  @ViewChild('addRawMaterialDrawer') addRawMaterialDrawer!: DrawerComponent;
  @ViewChild('createRawMaterialModal') createRawMaterialModal!: ModalComponent;


  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private service:GenericService){

    this.idFood=_routeData.snapshot.params['id'];
    this.idRecipe=_routeData.snapshot.params['idRecipe'];
    
  }
  
  ngOnInit(): void {
    this.getModelById().subscribe(data=>
    {
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      this.model=data.getResponse()!;
      this.rawMaterials=this.model.foodRawMaterials!;
      this.loading=false;
      
    })
    
  }
  deleteProductFood(id:string){
    this.service.delete(id,"foodRawMaterial/").subscribe(data=>{
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      ToastManager.showToastSuccess("Eliminación exitosa");
      this.ngOnInit();
    })
  }

  getModelById():Observable<HttpResponseWrapper<IFood>>{
    return this.service.getById<IFood>("foods/",this.idFood)
  }
  openEditRawMaterialModal(editId:string){
    this.foodRawMaterialsToEdit=editId;
    this.editRawMaterialModal.openModal();
  }
  openCreateRawMaterialModal(){
    this.createRawMaterialModal.openModal();
  }
  openAddRawMaterialsDrawer(){
    this.addRawMaterialDrawer.openDrawer();
  }
  updateSuccess(){
    this.editRawMaterialModal.closeModal();
    this.ngOnInit();
  }
  addRawMaterial(){
    this.ngOnInit();
  }
  createSuccess(){
    this.createRawMaterialModal.closeModal();
    this.ngOnInit();
  }

}
