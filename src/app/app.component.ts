import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title='Restro-manager-service';
  reloadNavBar:boolean=false;

  changeComponent(comp:any){
    this.reloadNavBar=!this.reloadNavBar;
  }
}
