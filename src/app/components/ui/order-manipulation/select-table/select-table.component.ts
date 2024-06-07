import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GenericService } from '../../../../infraestructure/generic/generic-service';
import { ITable } from '../../../../domain/models/interfaces/IOrder';

@Component({
  selector: 'app-select-table',
  templateUrl: './select-table.component.html',
  styleUrl: './select-table.component.css'
})
export class SelectTableComponent implements OnInit {
  tables?:ITable[];
  @Output() selectTableEvent = new EventEmitter<ITable>();
  constructor(private service:GenericService){}
  ngOnInit(): void {
    this.service.getAll<ITable>("tables/full").subscribe(tables=>this.tables=tables.getResponse());
  }
  selectedTable(table:ITable){
    this.selectTableEvent.emit(table);
  }


}
