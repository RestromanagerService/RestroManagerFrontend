import { Component, Input} from '@angular/core';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() idModal:string="default";
  private modal!:Modal;

  constructor(){}

  ngAfterViewInit() {
    const modalHtml = document.getElementById(this.idModal);
    this.modal = new Modal(modalHtml);
  }
  closeModal(){
    this.modal.hide();
  }
  openModal(){
    this.modal.show();
  }
}
