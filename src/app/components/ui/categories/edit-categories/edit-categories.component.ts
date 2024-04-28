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
export class EditCategoriesComponent {

  
}
