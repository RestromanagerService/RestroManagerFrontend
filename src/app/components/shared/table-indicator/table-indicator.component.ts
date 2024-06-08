import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ITable } from '../../../domain/models/interfaces/IOrder';
import { LocalStorageService } from '../../../security/helper/local-storage.service';
import { GenericService } from '../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-table-indicator',
  templateUrl: './table-indicator.component.html',
  styleUrl: './table-indicator.component.css'
})
export class TableIndicatorComponent implements OnInit {
  @ViewChild('modalTable') modalTable!: ModalComponent;
  private ORDER_TABLE: string = "ORDER_TABLE";
  table?:ITable;
  constructor(private localStorage:LocalStorageService,private service:GenericService){}

  ngOnInit(): void {
    this.localStorage.getItem(this.ORDER_TABLE).subscribe(table=>{
      if(table!=""){
        this.service.getById<ITable>("tables/",table).subscribe(resp=>{
          if(resp.getError()){
            this.localStorage.removeItem(this.ORDER_TABLE).subscribe();
            return;
          }
          this.table=resp.getResponse();
        })
      }
    });
  }
  selectedTable(table:ITable){
    this.localStorage.setItem(this.ORDER_TABLE,table.id).subscribe(ok=>{
      if(ok){
        this.table=table;
        this.modalTable.closeModal();
      }
    })
  }
  openModal(){
    this.modalTable.openModal();
  }
}
