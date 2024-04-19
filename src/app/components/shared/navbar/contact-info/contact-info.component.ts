import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.css'
})
export class ContactInfoComponent {
  @Input() iconClasses!: string;
  @Input() text!: string;
}
