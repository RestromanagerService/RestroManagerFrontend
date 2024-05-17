import { Component, Input, ViewChild, SimpleChanges } from "@angular/core";
import { AuthenticationState } from "../../../security/Auth/authentication-state";
import { AuthenticatorJWTService } from "../../../security/Auth/authenticator-jwt.service";
import { ToastManager } from "../../shared/alerts/toast-manager";
import { ModalComponent } from "../../shared/modal/modal.component";
import { Item } from "./data/item";
import { SubItem } from "./data/sub-item";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user?:AuthenticationState;
  loading:boolean=true;
  items:Item[]=[new Item("Productos","/products")];
  @Input() shouldWeReload:boolean=false;
  @ViewChild('modalLogin') modal!: ModalComponent;

  constructor(private authenticator:AuthenticatorJWTService){
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.loading=true;
    this.authenticator.getAuthenticationState().subscribe(authState=>{
      this.user=authState;
      this.items =this.getItems();
      this.loading=false;
    });
  }

  logout():void{
    this.authenticator.logout().subscribe(ok=>{
      this.ngOnInit();
      if(ok){
        ToastManager.showToastSuccess("Se ha cerrado sesión con éxito");
        return;
      }
      ToastManager.showToastError("Ocurrió un error al cerrar la sesión");
    });
  }

  getItems():Item[]{
    if(this.user?.role=="Admin"){
      return [new Item("Administración",undefined,
              [new SubItem("Administrar categorías","/categories"),
              new SubItem("Almacén de productos comerciales","/stockCommercialProducts"),
              new SubItem("Almacén de materias primas","/stockRawMaterials"),
              new SubItem("Administración de recetas","/recipes")
              ]),
              new Item("Productos","/products"),
              new Item("Para el administrador","/admin")];
    }
    if(this.user?.role=="Chef"){
      return [new Item("Administración",undefined,
              [new SubItem("Administrar categorías","/categories"),
              new SubItem("Almacén de productos comerciales","/stockCommercialProducts"),
              new SubItem("Almacén de materias primas","/stockRawMaterials"),
              new SubItem("Administración de recetas","/recipes")
              ]),
              new Item("Productos","/products"),
              new Item("Para el chef","/chef")];
    }
    if(this.user?.role=="Waiter"){
      return [new Item("Administración",undefined,
              [new SubItem("Administrar categorías","/categories"),
              new SubItem("Almacén de productos comerciales","/stockCommercialProducts"),
              new SubItem("Almacén de materias primas","/stockRawMaterials"),
              new SubItem("Administración de recetas","/recipes")
              ]),
              new Item("Productos","/products"),
              new Item("Para el mesero","/waiter")];
    }
    if(this.user?.role=="User"){
      return [new Item("Administración",undefined,
                [new SubItem("Administrar categorías","/categories"),
                new SubItem("Almacén de productos comerciales","/stockCommercialProducts"),
                new SubItem("Almacén de materias primas","/stockRawMaterials"),
                new SubItem("Administración de recetas","/recipes")
                ]),
                new Item("Productos","/products"),
                new Item("Para el usuario","/user")];
    }
    return [new Item("Productos","/products")];
  }
  openModalLogin(){
    this.modal.openModal();
  }
  loginSuccess(){
    this.modal.closeModal();
    this.ngOnInit();
  }

}
