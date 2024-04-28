import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrl: './expense-modal.component.css'
})
export class ExpenseModalComponent {
  @Input() show: boolean = false;
  closeModal(): void {
    this.show = false;
  }
}
