import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUnits } from '../../../../domain/models/Iunits';
import { IProductFoods, IFood } from '../../../../domain/models/interfaces/Iproduct';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { GenericService } from '../../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-create-foods',
  templateUrl: './create-foods.component.html',
  styleUrl: './create-foods.component.css'
})
export class CreateFoodsComponent implements OnInit {
  @Input() recipeId:string="";
  createForm!: FormGroup;
  imageBase64?:string;
  units:IUnits[]=[]
  @Output() createSuccess = new EventEmitter<void>();
  constructor(private _router:Router,private formBuilder: FormBuilder, private service: GenericService){
    this.buildForm();
  }
  ngOnInit(): void {
    this.service.getAll<IUnits>("Units/full").subscribe(data=>{
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      this.units=data.getResponse()!;
    });
  }
  

  private navigateUrlBack() {
    this._router.navigate(["/recipes/details/" + this.recipeId]);
  }

  createFood(){
    if(this.createForm.valid){
      let newFood:IFood={
        name:this.createForm.get("nameFood")?.value,
        productionCost:this.createForm.get("productionCost")?.value,
        photo:this.imageBase64,
      };
      let newProductFood:IProductFoods={
        amount:this.createForm.get("ammount")?.value,
        unitsId:this.createForm.get("units")?.value,
        food:newFood,
        productId:this.recipeId
      };
      this.service.post<IProductFoods,IProductFoods>(newProductFood,"productFood").subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        ToastManager.showToastSuccess("Registro exitoso");
        this.createSuccess.emit();
      });
    }

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.indexOf(file.type) === -1) {
      ToastManager.showToastError("Tipo de archivo "+file.type+" no permitido");
      event.target.value = null;
      return
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64=reader.result as string;
        this.imageBase64=this.imageBase64.split(',',2)[1];
      };
      reader.onerror = (error) => {
        ToastManager.showToastError("Ocurrió un error al procesar la fotografía")
      };
    }
  }
  buildForm(){
    this.createForm = this.formBuilder.group({
      ammount:new FormControl(0,[Validators.min(0.001),Validators.required]),
      units:new FormControl('',Validators.required),
      nameFood:new FormControl('',Validators.required),
      photo:new FormControl(),
      productionCost:new FormControl(0,[Validators.min(0.001),Validators.required])}
    );
  }
}
