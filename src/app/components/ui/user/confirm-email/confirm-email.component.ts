import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { GenericService } from '../../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit {
  userId!:string;
  token!:string;
  loading:boolean=true;
  constructor(private _router:Router,private _routeData:ActivatedRoute, private service:GenericService){
    
  }
  ngOnInit(): void {
    this._routeData.queryParams.subscribe(params=>{
      this.userId=params['userid'];
      this.token=params['token'];
      this.loading=false;
    })
  }
  confirmEmail(){
    this.service.getAll<void>("accounts/confirmEmail?userid="+this.userId+"&token="+this.token).subscribe(data=>{
      if(data.getError()){
        ToastManager.showToastError(data.getResponseMessage());
        return;
      }
      this._router.navigate(["/"]);
      ToastManager.showToastInfo("Confirmación exitosa");
    });
  }

}
