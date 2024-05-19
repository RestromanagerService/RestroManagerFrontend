import { Component } from '@angular/core';
import { IState } from '../../../../domain/models/interfaces/IState';
import { ICity } from '../../../../domain/models/interfaces/ICity';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildPagination } from '../../../../domain/models/pagination';
import { ToastManager } from '../../../shared/alerts/toast-manager';
import { GenericService } from '../../../../infraestructure/generic/generic-service';

@Component({
  selector: 'app-cities-by-state',
  templateUrl: './cities-by-state.component.html',
  styleUrl: './cities-by-state.component.css'
})

export class CitiesByStateComponent {
  cities:ICity[] = [];
  loading:boolean = true;
  idCity:string = ""
  idState:string = "";
  idCountry:string = "";
  state! : IState;  
  


  constructor(private _router:Router,
    private _routeData:ActivatedRoute,
    private citiesService: GenericService,
    private stateService: GenericService)
    {
      this.idCity = _routeData.snapshot.params['id'];
      this.idState = _routeData.snapshot.params['idState'];
      this.idCountry = _routeData.snapshot.params['idCountry'];
    }

  ngOnInit(): void {
    this.getCities();
  }

  getCities () {
    let pagination = BuildPagination.build(this.idState,10,1,'');
    this.stateService.getById<IState>("states/",this.idState).subscribe( state => 
      {
        if(state.getError()) {
          ToastManager.showToastError("El estado (Departamento) no existe");
          this._router.navigate(["/states"]);
          return;
        };
        this.state = state.getResponse()!;
        this.citiesService.getAll<ICity>("cities/", pagination).subscribe(allCities =>
          {
            if(!allCities.getError()) {
              this.cities = allCities.getResponse()!;
              this.loading = false;
            };
          });
      });
  }

  deleteState(id:string){
    this.stateService.delete(id,"cities/").subscribe(response=>{
      this.loading=true;
      this.ngOnInit();
    });
  }
}

