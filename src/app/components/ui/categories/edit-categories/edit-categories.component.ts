import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../../domain/models/ICategory';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  animation: false,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrl: './edit-categories.component.css'
})
export class EditCategoriesComponent implements OnInit{

  category?:ICategory;
  editCategoryForm: FormGroup;

  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private formBuilder: FormBuilder, private categoryService:GenericService<ICategory>){
    this.editCategoryForm = this.formBuilder.group({
        name: ['',Validators.required]})
  }
  
  ngOnInit(): void {
    var idCategory=this._routeData.snapshot.params['id'];
    this.categoryService.getById("categories/",idCategory).subscribe(data=>this.category=data.getResponse())
    
  }

  saveCategory(){
    if(this.editCategoryForm.value.name!=this.category?.name&&
      this.editCategoryForm.value.name!=''){
      var idCategory=this._routeData.snapshot.params['id'];
      var updateCategory:ICategory={id:idCategory,name:this.editCategoryForm.value.name}
      this.categoryService.put(updateCategory,"categories/").subscribe();
      this._router.navigate(["/categories"])
      Toast.fire({
        icon: 'success',
        title: 'Actualización exitosa',
      })
      return
    }
    Toast.fire({
      icon: 'info',
      title: 'No has realizado modificaciones',
    })

  }
  
}
