import { Component, Input } from '@angular/core';
import { Item } from '../../../layout/navbar/data/item';

@Component({
  selector: 'app-navbar-link',
  templateUrl: './navbar-link.component.html',
  styleUrl: './navbar-link.component.css'
})
export class NavbarLinkComponent {
  @Input() item!: Item;
  @Input() dropDownId!: string;
}
