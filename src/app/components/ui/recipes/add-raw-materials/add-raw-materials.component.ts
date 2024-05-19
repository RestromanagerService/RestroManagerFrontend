import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRawMaterial } from '../../../../domain/models/interfaces/IRawMaterial';
import { Observable } from 'rxjs';
import { IUnits } from '../../../../domain/models/Iunits';
import { IFood, IFoodRawMaterials, IProductFoods } from '../../../../domain/models/interfaces/Iproduct';
import { BuildPagination } from '../../../../domain/models/pagination';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infraestructure/generic/http-response-wrapper';

@Component({
  selector: 'app-add-raw-materials',
  templateUrl: './add-raw-materials.component.html',
  styleUrl: './add-raw-materials.component.css'
})
export class AddRawMaterialsComponent {
  rawMaterials:IRawMaterial[]=[];
  units:IUnits[]=[];
  valueSearch:string="";
  @Input() foodId:string="";
  @Output() addRawMaterialEvent = new EventEmitter<void>();
  constructor(private service:GenericService){
  }
  ngOnInit(): void {
    if(this.valueSearch==""){
      this.service.getAll<IRawMaterial>("rawMaterials/full").subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        this.rawMaterials=data.getResponse()!;
        this.getUnits().subscribe(data=>{
          if(!data.getError()){
            this.units=data.getResponse()!;
          }
        })
      });
    }else{
      let pagination=BuildPagination.build('',20,1,this.valueSearch);
      this.service.getAll<IRawMaterial>("rawMaterials",pagination).subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        this.rawMaterials=data.getResponse()!;
        this.getUnits().subscribe(data=>{
          if(!data.getError()){
            this.units=data.getResponse()!;
          }
        })
      });
    }
  }
  addFood(rawMaterial:IRawMaterial){
    const amount = parseInt((<HTMLInputElement>document.getElementById('amount-' + rawMaterial.id)).value);
    const unitsID = (<HTMLSelectElement>document.getElementById('unit-' + rawMaterial.id)).value;
    if(amount<=0){
      ToastManager.showToastError("La cantidad debe ser mayor a cero");
      return;
    }
    let foodRawMaterial:IFoodRawMaterials={
      amount:amount,
      unitsId:unitsID,
      rawMaterialId:rawMaterial.id!,
      foodId:this.foodId
    }
    this.service.post<IFoodRawMaterials,IFoodRawMaterials>(foodRawMaterial,"foodRawMaterial/").subscribe(data=>{
      if(data.getError()){
        if(data.getResponseMessage().includes("Ya existe")){
          ToastManager.showToastError("La materia prima ya está incluida en el alimento");
          return;
        }
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      ToastManager.showToastSuccess("Se ha añadido la materia prima");
      this.addRawMaterialEvent.emit();
    });
  }
  getUnits():Observable<HttpResponseWrapper<IUnits[]>>{
    return this.service.getAll<IUnits>("Units/full")
  }
  getChangeValueSearch(valueSearch:string){
    this.valueSearch=valueSearch;
    this.ngOnInit();
  }
}
