import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-addres-card',
  templateUrl: './addres-card.component.html',
  styleUrl: './addres-card.component.css'
})
export class AddresCardComponent {
@Input() Title! : string;
@Input() SubTitle! : string;
}
