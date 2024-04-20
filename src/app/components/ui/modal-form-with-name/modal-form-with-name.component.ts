import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-modal-form-with-name',
  templateUrl: './modal-form-with-name.component.html',
  styleUrl: './modal-form-with-name.component.css'
})
export class ModalFormWithNameComponent {
  @Input() 
  titleModal!: string;

}
