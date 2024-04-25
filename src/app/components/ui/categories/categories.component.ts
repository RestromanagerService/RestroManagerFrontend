import { Component, OnInit } from '@angular/core';
import { ICategory } from '../../../domain/models/ICategory';
import { GenericService } from '../../../infraestructure/generic/generic-service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  animation: false,
  position: 'bottom-right',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
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

  deleteCategory(id:string): void{
    Swal.fire({
      title: "¿Estás seguro de eliminar la categoría?",
      text: "No podrás revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(id,"categories/").subscribe(data=>this.ngOnInit());
        Toast.fire({
          icon: 'success',
          title: 'Eliminación exitosa',
        })
      }
    });    
  }

}
