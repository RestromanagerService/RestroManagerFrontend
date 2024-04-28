import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IExpense } from '../../../domain/models/interfaces/IExpense';
import { ExpenseUseCase } from '../../../domain/usecases/expense/expense.usecase';
import { TypeExpenseUseCase } from '../../../domain/usecases/type-expense/type-expense.usecase';
import { IWithName } from '../../../domain/models/interfaces/IWithName';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenses!: IExpense[];
  typeExpenses!: IWithName[];

  constructor(
    private expenseUseCase: ExpenseUseCase, 
    private typeExpenseUseCase: TypeExpenseUseCase
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.typeExpenseUseCase.getAllTypeExpenses().subscribe(typeExpensesData => {
      this.typeExpenses = typeExpensesData;
      this.expenseUseCase.getAllExpenses().subscribe(expensesData => {
        this.expenses = expensesData.map(expense => {
          const typeExpenseName = this.typeExpenses.find(typeExpense => typeExpense.id === expense.typeExpenseId)?.name || 'Not available';
          return {
            ...expense,
            typeExpenseName
          };
        });
      });
    });
  }


  editExpense(id: string): void {
    console.log('Editing expense with ID:', id);
  }

  deleteExpense(id: string): void {
    Swal.fire({
      title: "¿Estás seguro de eliminar este registro?",
      text: "¡No podrás revertir este cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        this.expenseUseCase.deleteExpenseById(id).subscribe({
          next: (success) => {
            if(success) {
              Swal.fire({
                title: "Eliminado!",
                text: "Ha eliminado el registro con el id " + id + " correctamente.",
                icon: "success"
              });
              this.loadExpenses();
            } else {
              Swal.fire("Error", "No se pudo eliminar el registro.", "error");
            }
          },
          error: (err) => {
            Swal.fire("Error", "Ocurrió un error al eliminar el registro.", "error");
            console.error('Error al eliminar el gasto', err);
          }
        });
      }
    });

    console.log('Deleting expense with ID:', id);
  }

}
