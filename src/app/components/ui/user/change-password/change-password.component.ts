import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { GenericService } from '../../../../infrastructure/generic/generic-service';
import { HttpResponseWrapper } from '../../../../infrastructure/generic/http-response-wrapper';
import { ToastManager } from '../../../shared/alerts/toast-manager';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  changePassForm: FormGroup;
  equalPass: boolean = true;

  constructor(private router: Router, private formBuilder: FormBuilder, private service: GenericService) {
    this.changePassForm = this.formBuilder.group({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirm: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.changePassForm.valid && this.equalPasswords()) {
      const { currentPassword, newPassword, confirm } = this.changePassForm.value;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      const url = 'Accounts/changePassword';
      const body = { currentPassword, newPassword, confirm };

      this.service.post<any, HttpResponseWrapper<any>>(body, url).subscribe(
        response => {
          if (!response.getError()) {
            ToastManager.showToastSuccess('Se ha cambiado la contraseña exitosamente');
            this.router.navigate(['/']);  // Navega a una página de éxito
          } else {
            ToastManager.showToastError(response.getResponseMessage());
          }
        },
        error => {
          ToastManager.showToastError('Error cambiando la contraseña');
        }
      );
    } else {
      ToastManager.showToastWarning('Las contraseñas deben coincidir');
    }
  }

  passChange() {
    if (this.equalPasswords()) {
      this.equalPass = true;
    } else {
      this.equalPass = false;
    }
  }

  equalPasswords(): boolean {
    return this.changePassForm.get('newPassword')!.value === this.changePassForm.get('confirm')!.value;
  }
}
