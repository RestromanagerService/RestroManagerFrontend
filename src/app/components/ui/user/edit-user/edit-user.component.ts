import { Component } from '@angular/core';
import { GenericService } from '../../../../infrastructure/generic/generic-service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICity } from '../../../../domain/models/interfaces/ICity';
import { ICountry } from '../../../../domain/models/interfaces/ICountry';
import { IState } from '../../../../domain/models/interfaces/IState';
import { UserType } from '../../../../security/Auth/user-type';
import { UserDTO } from '../../../../security/DTOs/user-dto';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { IUser } from '../../../../domain/models/interfaces/IUser';
import { AuthenticatorJWTService } from '../../../../security/Auth/authenticator-jwt.service';
import { TokenDTO } from '../../../../security/DTOs/token-dto';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  user!:IUser;
  countries:ICountry[]=[];
  states:IState[]=[];
  cities:ICity[]=[];
  imageBase64?:string;
  editForm: FormGroup;
  loading:boolean=true;
  constructor(private _router:Router,private formBuilder: FormBuilder,private service:GenericService,private loginService:AuthenticatorJWTService){
    this.editForm = this.formBuilder.group({
      firstName:new FormControl('',Validators.required),
      lastName:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
      document:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      state:new FormControl('',Validators.required),
      country:new FormControl('',Validators.required),
      photo:new FormControl('')}
    );
  }
  ngOnInit(): void {
    this.service.getById<IUser>("accounts/","").subscribe(data=>{
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        this._router.navigate(["/"]);
        return;
      }
      this.user=data.getResponse()!;
      this.editForm.get("firstName")?.setValue(this.user.firstName);
      this.editForm.get("lastName")?.setValue(this.user.lastName);
      this.editForm.get("address")?.setValue(this.user.address);
      this.editForm.get("document")?.setValue(this.user.document);
      this.editForm.get("phone")?.setValue(this.user.phoneNumber);
      this.editForm.get("state")?.setValue(this.user.city?.state?.id);
      this.editForm.get("country")?.setValue(this.user.city?.state?.country?.id);
      this.editForm.get("city")?.setValue(this.user.city?.id);
      this.service.getAll<ICountry>("countries/combo").subscribe(data=>{
        this.countries=data.getResponse()!;
        this.getStatesByCountry(this.user.city?.state?.country?.id!);
        this.getCitiesByState(this.user.city?.state?.id!);
      });
    })
    
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (file) {
      if (allowedTypes.indexOf(file.type) === -1) {
        ToastManager.showToastError("Tipo de archivo "+file.type+" no permitido");
        event.target.value = null;
        return
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageBase64=reader.result as string;
        this.imageBase64=this.imageBase64.split(',',2)[1];
      };
      reader.onerror = (error) => {
        ToastManager.showToastError("Ocurrió un error al procesar la fotografía")
      };
      return;
    }
    this.imageBase64=undefined;
  }
  onCountrySelected(event: any) {
    this.states=[];
    this.cities=[];
    if(event.target.value){
      this.getStatesByCountry(event.target.value);
    }
    
  }
  private getStatesByCountry(country: string) {
    this.service.getAll<IState>("states/combo/" + country).subscribe(data => this.states = data.getResponse()!);
  }

  onStateSelected(event: any) {
    this.cities=[];
    if(event.target.value){
      this.getCitiesByState(event.target.value);
    }
    
  }
  private getCitiesByState(state: string) {
    this.service.getAll<ICity>("cities/combo/" + state).subscribe(data => {
      this.cities = data.getResponse()!;
      this.loading=false;
    });
  }

  saveUser(){
    if(this.editForm.valid){
      let userEdit:IUser={
        document:this.editForm.get("document")?.value,
        firstName:this.editForm.get("firstName")?.value,
        lastName:this.editForm.get("lastName")?.value,
        address:this.editForm.get("address")?.value,
        cityId:this.editForm.get("city")?.value,
        phoneNumber:this.editForm.get("phone")?.value,
        photo:this.imageBase64
      };
      if(this.isChange(userEdit)){
        this.service.put<IUser,TokenDTO>(userEdit,"accounts/").subscribe(data=>{
          if(data.getError()){
            ToastManager.showToastError(data.getResponseMessage());
            return;
          }
          this.loginService.loginWithToken(data.getResponse()!.token).subscribe(ok=>{
            if(ok){
              this._router.navigate(["/"]);
              ToastManager.showToastSuccess("Actualización éxitosa");
              return;
            }
          })
          
        });
        return;
      }
      ToastManager.showToastWarning("No tienes modificaciones");
    }
  }
  isChange(userEdit:IUser):boolean{
    if(userEdit.document!=this.user.document){
      return true;
    }
    if(userEdit.firstName!=this.user.firstName){
      return true;
    }
    if(userEdit.lastName!=this.user.lastName){
      return true;
    }
    if(userEdit.address!=this.user.address){
      return true;
    }
    if(userEdit.cityId!=this.user.cityId){
      return true;
    }
    if(userEdit.phoneNumber!=this.user.phoneNumber){
      return true;
    }
    if(this.imageBase64!=undefined){
      return true;
    }
    return false;
  }

}
