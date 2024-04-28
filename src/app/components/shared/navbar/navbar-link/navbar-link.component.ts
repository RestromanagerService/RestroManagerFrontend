import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar-link',
  templateUrl: './navbar-link.component.html',
  styleUrl: './navbar-link.component.css'
})
export class NavbarLinkComponent {
  @Input() linkRoute!: string;
  @Input() linkText!: string;
  @Input() subItemsLink:string[][]=[];
  @Input() dropDownId?: string;
}
