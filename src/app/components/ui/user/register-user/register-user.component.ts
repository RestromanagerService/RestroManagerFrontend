import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserDTO } from "../../../../security/DTOs/user-dto";
import { ICity } from "../../../../domain/models/interfaces/ICity";
import { ICountry } from "../../../../domain/models/interfaces/ICountry";
import { IState } from "../../../../domain/models/interfaces/IState";
import { GenericService } from "../../../../infrastructure/generic/generic-service";
import { ToastManager } from "../../../shared/alerts/toast-manager";
import { UserType } from "../../../../security/Auth/user-type";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  countries:ICountry[]=[];
  states:IState[]=[];
  cities:ICity[]=[];
  imageBase64?:string;
  registerForm: FormGroup;
  equalPass:boolean=true;
  constructor(private _router:Router,private formBuilder: FormBuilder,private service:GenericService){
    this.registerForm = this.formBuilder.group({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',Validators.required),
      passwordConfirm:new FormControl('',Validators.required),
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      document:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      photo:new FormControl('')}
    );
  }
  ngOnInit(): void {
    this.service.getAll<ICountry>("countries/combo").subscribe(data=>this.countries=data.getResponse()!);
  }
  registerUser(){
    if(this.registerForm.valid && this.equalPasswords() ){
        let newUser:UserDTO={
          email:this.registerForm.get("email")?.value,
          password:this.registerForm.get("password")?.value,
          passwordConfirm:this.registerForm.get("passwordConfirm")?.value,
          document:this.registerForm.get("document")?.value,
          firstName:this.registerForm.get("firstName")?.value,
          lastName:this.registerForm.get("lastName")?.value,
          address:this.registerForm.get("address")?.value,
          cityId:this.registerForm.get("city")?.value,
          userName: this.registerForm.get("email")?.value,
          phoneNumber:this.registerForm.get("phone")?.value,
          userType:UserType.User,
          photo:this.imageBase64
        };
        this.service.post<UserDTO,string>(newUser,"accounts/createUser").subscribe(data=>{
          if(data.getError()){
            ToastManager.showToastError(data.getResponseMessage());
            return;
          }
          ToastManager.showToastSuccess("Registro exitoso, se ha enviado la información de confirmación al correo");
          this._router.navigate(["/"]);
        });
        return;

    }
    ToastManager.showToastWarning("Las contraseñas deben coincidir")
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.indexOf(file.type) === -1) {
      ToastManager.showToastError("Tipo de archivo "+file.type+" no permitido");
      event.target.value = null;
      return
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64=reader.result as string;
        this.imageBase64=this.imageBase64.split(',',2)[1];
      };
      reader.onerror = (error) => {
        ToastManager.showToastError("Ocurrió un error al procesar la fotografía")
      };
    }
  }
  onCountrySelected(event: any) {
    this.states=[];
    this.cities=[];
    if(event.target.value){
      this.service.getAll<IState>("states/combo/"+event.target.value).subscribe(data=>this.states=data.getResponse()!)
    }
    
  }
  onStateSelected(event: any) {
    this.cities=[];
    if(event.target.value){
      this.service.getAll<ICity>("cities/combo/"+event.target.value).subscribe(data=>this.cities=data.getResponse()!)
    }
    
  }
  passChange(){
    if(this.equalPasswords()){
        this.equalPass=true;
        return;
    }
    this.equalPass=false;
    
  }
  equalPasswords():boolean{
    return this.registerForm.get('password')!.value === this.registerForm.get('passwordConfirm')!.value
  }
}
