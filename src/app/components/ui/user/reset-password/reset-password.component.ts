import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO } from '../../../../security/DTOs/user-dto';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { ResetPasswordDTO } from '../../../../security/DTOs/reset-password-dto';
import { GenericService } from '../../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetPassForm: FormGroup;
  equalPass:boolean=true;
  userId!:string;
  token!:string;
  constructor(private _router:Router,private _routeData:ActivatedRoute,private formBuilder: FormBuilder,private service:GenericService){
    this.resetPassForm = this.formBuilder.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',Validators.required),
      passwordConfirm:new FormControl('',Validators.required)
    }
    );
    this._routeData.queryParams.subscribe(params=>{
      this.userId=params['userid'];
      this.token=params['token'];
    });
  }
  changePassword(){
    if(this.resetPassForm.valid && this.equalPasswords() ){
      let reset:ResetPasswordDTO={
        email:this.resetPassForm.get("email")?.value,
        password:this.resetPassForm.get("password")?.value,
        confirmPassword:this.resetPassForm.get("passwordConfirm")?.value,
        token:this.token
      };
      this.service.post<ResetPasswordDTO,void>(reset,"accounts/resetPassword").subscribe(data=>{
        if(data.getError()){
          ToastManager.showToastError(data.getResponseMessage());
          return;
        }
        ToastManager.showToastSuccess("Se ha reestablecido la contrseña exitosamente");
        this._router.navigate(["/"]);
      });
      return;

  }
  ToastManager.showToastWarning("Las contraseñas deben coincidir")
  }
  passChange(){
    if(this.equalPasswords()){
        this.equalPass=true;
        return;
    }
    this.equalPass=false;
    
  }
  equalPasswords():boolean{
    return this.resetPassForm.get('password')!.value === this.resetPassForm.get('passwordConfirm')!.value
  }
}
