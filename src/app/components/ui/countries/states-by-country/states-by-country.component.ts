import { Component } from '@angular/core';
import { IState } from '../../../../domain/models/interfaces/IState';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildPagination } from '../../../../domain/models/pagination';
import { ICountry } from '../../../../domain/models/interfaces/ICountry';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { GenericService } from '../../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-states-by-country',
  templateUrl: './states-by-country.component.html',
  styleUrl: './states-by-country.component.css'
})
export class StatesByCountryComponent {
  states:IState[] = [];
  loading:boolean = true;
  idCountry:string = "";
  country! : ICountry;

  constructor(private _router:Router,
     private _routeData:ActivatedRoute,
     private stateService: GenericService,
     private countryService: GenericService)
    {
      this.idCountry=_routeData.snapshot.params['id'];
    }

  ngOnInit(): void {

    this.getStates();
    
  }

  getStates() {
    let pagination = BuildPagination.build(this.idCountry,10,1,'');
    this.countryService.getById<ICountry>("countries/", this.idCountry).subscribe(country => 
      {
        if(country.getError()) {
          ToastManager.showToastError("El país no existe");
          this._router.navigate(["/countries"]);
          return;
        };
        this.country = country.getResponse()!;
        this.stateService.getAll<IState>("states/", pagination).subscribe(allStates => 
          {
            if(!allStates.getError()) {
              this.states = allStates.getResponse()!;
              this.loading = false;
            };
          });
      });
  }

  deleteState(id:string){
    this.stateService.delete(id,"state/").subscribe(response=>{
      this.loading=true;
      this.ngOnInit();
    });
  }
}
