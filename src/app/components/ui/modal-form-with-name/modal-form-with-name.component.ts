import { Component, Input, input } from '@angular/core';
import { IWithName } from '../../../domain/models/interfaces/IWithName';

@Component({
  selector: 'app-modal-form-with-name',
  templateUrl: './modal-form-with-name.component.html',
  styleUrl: './modal-form-with-name.component.css'
})
export class ModalFormWithNameComponent {
  @Input() 
  idModal!: string;
  @Input() 
  titleModal!: string;
  @Input()
  objectWithName: IWithName;

  constructor(){
    this.objectWithName= {id:"", name: ""};
  }




}
