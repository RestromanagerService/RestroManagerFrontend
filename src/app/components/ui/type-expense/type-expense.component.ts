import { Component, OnInit } from '@angular/core';
import { IWithName } from '../../../domain/models/interfaces/IWithName';
import { TypeExpenseUseCase } from '../../../domain/usecases/type-expense/type-expense.usecase';

@Component({
  selector: 'app-type-expense',
  templateUrl: './type-expense.component.html',
  styleUrl: './type-expense.component.css'
})
export class TypeExpenseComponent implements OnInit {

  typeExpenses!: IWithName[];

  constructor(private typeExpenseUseCase: TypeExpenseUseCase){}

  ngOnInit(): void {
    this.typeExpenseUseCase.getAllTypeExpenses().subscribe(data =>this.typeExpenses=data)
  }

}
