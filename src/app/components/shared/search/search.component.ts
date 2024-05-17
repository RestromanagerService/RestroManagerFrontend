import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() describeSearch:string="Buscar";
  @Output() searchValueEnter = new EventEmitter<string>();
  @Output() searchValueClick = new EventEmitter<string>();
  @Output() restoreValueClick = new EventEmitter<string>();
  inputChange(event: Event){
    const target = event.target as HTMLSelectElement;
    if (target) {
      const value = target.value;
      this.searchValueEnter.emit(value);
    }

  }
  searchClick(){
    
  }

}
