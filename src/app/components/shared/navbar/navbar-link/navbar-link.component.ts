import { Component, Input } from '@angular/core';
import { Item } from '../../../layout/navbar/data/item';
import { Dropdown, DropdownInterface, DropdownOptions } from 'flowbite';


@Component({
  selector: 'app-navbar-link',
  templateUrl: './navbar-link.component.html',
  styleUrl: './navbar-link.component.css'
})
export class NavbarLinkComponent {
  @Input() item!: Item;
  @Input() dropDownId!: string;


  toggleItem(){
    if(this.item.hasSubItems()){
      const options: DropdownOptions = {
        placement: 'bottom',
        triggerType: 'click',
        offsetSkidding: 0,
        offsetDistance: 10,
        delay: 300,
        onHide: () => {
        },
        onShow: () => {
        },
        onToggle: () => {
        },
      };
      const targetEl: HTMLElement = document.getElementById('target-'+this.item.getId())!;
      const triggerEl: HTMLElement = document.getElementById('trigger-'+this.item.getId())!;
      const collapse: DropdownInterface  = new Dropdown(targetEl,triggerEl,options);
      collapse.toggle();
    }
    
  }
}
