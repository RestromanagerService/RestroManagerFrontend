import { Component, Input } from '@angular/core';
import { Drawer, DrawerInterface } from 'flowbite';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent {
  @Input() idDrawer:string="default";
  @Input() labelDrawer:string="default-label";
  private drawer!:DrawerInterface ;


  ngAfterViewInit() {
    const modalHtml = document.getElementById(this.idDrawer);
    this.drawer = new Drawer(modalHtml);
  }
  closeDrawer(){
    this.drawer.hide();
  }

  openDrawer(){
    this.drawer.show();
  }
}
