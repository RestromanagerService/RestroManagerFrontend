import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { Router } from '@angular/router';
import { AuthenticatorJWTService } from '../../../../security/Auth/authenticator-jwt.service';
import { LoginDTO } from '../../../../security/DTOs/login-dto';
import Swal from 'sweetalert2';
import { GenericService } from '../../../../infrastructure/generic/generic-service';
import { EmailDTO } from '../../../../security/DTOs/email-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  @Output() loginSuccess = new EventEmitter<void>();
  constructor(private _router:Router,private authService:AuthenticatorJWTService,private formBuilder: FormBuilder, private service:GenericService){
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.email],
      password:['',Validators.required]});
  }
  login(){
    if(this.validateErrors()){
      var user:LoginDTO= {
        email:this.loginForm.get("email")!.value,
        password:this.loginForm.get("password")!.value
      };
      this.authService.login(user).subscribe(data=>{
        if(data.getError()){
          if(data.getResponseMessage().includes("no ha sido habilitado")){
            this.resendEmail();
            return;
          }
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        ToastManager.showToastSuccess("El inicio de sesión fue exitoso");
        this.loginSuccess.emit();
        this._router.navigate(["/"]);
      });
    }
  }
  private validateErrors():boolean{
    let result=true;
    if(this.loginForm.get("email")!.errors){
      ToastManager.showToastWarning("El campo email no cumple con los requisitos");
      result=false;
    }
    if(this.loginForm.get("password")!.errors){
      ToastManager.showToastWarning("El campo contraseña es requerido");
      result=false;
    }
    return result;
  }
  navigateToRegister(){
    this.loginSuccess.emit();
    this._router.navigate(["/register"]);
  }

  resendEmail(): void{
    Swal.fire({
      title: "Parece que no has confirmado tu correo electrónico",
      text: "¿Quieres que te reenviemos el correo de confirmación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, enviar",
      cancelButtonText:"No, gracias"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.post<EmailDTO,void>({email:this.loginForm.get("email")!.value},"accounts/resendToken").subscribe(data=>{
          if(!data.getError()){
            ToastManager.showToastSuccess("Te hemos enviado el correo de confirmación");
          }
        })
      }
    });    
  }
  resetPassword(){
    Swal.fire({
      title: "Recuperar contraseña",
      text: "Por favor, escribe tu correo para recuperar la contraseña",
      input: 'email',
      allowOutsideClick: true,   
      showCloseButton: true,   
      inputAutoTrim:true,
      inputValidator: email => {
        if (!email) {
            return "Necesitas escribir el correo";
        }else if(!this.isValidEmail(email)){
          return "Correo inválido";
        } else {
            return undefined;
        }
    }
    }).then((result) => {
        if (result.value) {
          this.service.post<EmailDTO,void>({email:result.value},"accounts/recoverPassword").subscribe(data=>{
            if(data.getError()){
              ToastManager.showToastError("Tuvimos problemas, por favor, inténtalo de nuevo");
              return;
            }
            ToastManager.showToastInfo("Se ha enviado la información de recuperación al correo");
          });
        }
    }); 
  }
  isValidEmail(email:string) {
    return /\S+@\S+\.\S+/.test(email);
  }

}
