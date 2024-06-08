import { Component, Input, ViewChild, SimpleChanges } from '@angular/core';
import { AuthenticationState } from '../../../security/Auth/authentication-state';
import { AuthenticatorJWTService } from '../../../security/Auth/authenticator-jwt.service';
import { ToastManager } from '../../shared/alerts/toast-manager';
import { ModalComponent } from '../../shared/modal/modal.component';
import { Item } from './data/item';
import { SubItem } from './data/sub-item';
import {
  Collapse,
  CollapseInterface,
  CollapseOptions,
  InstanceOptions,
} from 'flowbite';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user?: AuthenticationState;
  loading: boolean = true;
  items: Item[] = [new Item('Productos', '/products')];
  mapa:Map<string,Item[]>= new Map();
  @Input() shouldWeReload: boolean = false;
  @ViewChild('modalLogin') modal!: ModalComponent;

  private readonly menuAdmin = [
    new Item('Administración', 'item-1', undefined, [
      new SubItem('Administrar categorías', '/categories'),
      new SubItem(
        'Almacén de productos comerciales',
        '/stockCommercialProducts'
      ),
      new SubItem('Almacén de materias primas', '/stockRawMaterials'),
      new SubItem('Administración de recetas', '/recipes'),
      new SubItem('Administración de países', '/countries')
    ]),
    new Item('Productos', 'item-2', '/products'),
  ];

  private readonly menuChef = [
    new Item('Administración', 'item-4', undefined, [
      new SubItem('Almacén de materias primas', '/stockRawMaterials'),
      new SubItem('Administración de recetas', '/recipes'),
    ]),
    new Item('Productos', 'item-5', '/products'),
  ];

  private readonly menuWaiter = [
    new Item('Productos', 'item-8', '/products'),
    new Item('Para el mesero', 'item-9', '/waiter'),
  ];

  private readonly menuUser = [
    new Item('Productos', 'item-11', '/products'),
    new Item('Para el usuario', 'item-12', '/user'),
  ];

  private readonly menuAnonimous = [new Item('Productos', 'item-13', '/products')];

  constructor(
    private authenticator: AuthenticatorJWTService,
    private _router: Router
  ) {
    this.mapa.set("Admin",this.menuAdmin);
    this.mapa.set("Chef",this.menuChef);
    this.mapa.set("Waiter",this.menuWaiter);
    this.mapa.set("User",this.menuUser);
    this.mapa.set("anonimous",this.menuAnonimous);
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.loading = true;
    this.authenticator.getAuthenticationState().subscribe((authState) => {
      this.user = authState;
      this.items = this.getItems();
      this.loading = false;
    });
  }

  logout(): void {
    this._router.navigate(['/']);
    this.authenticator.logout().subscribe((ok) => {
      this.ngOnInit();
      if (ok) {
        ToastManager.showToastSuccess('Se ha cerrado sesión con éxito');
        return;
      }
      ToastManager.showToastError('Ocurrió un error al cerrar la sesión');
    });
  }

  getItems(): Item[] {
    return this.mapa.get(this.user?.role!)!;
  }
  openModalLogin() {
    this.modal.openModal();
  }
  loginSuccess() {
    this.modal.closeModal();
    this.ngOnInit();
  }
  toggleUserMenu() {
    if (this.user?.role != 'anonimous') {
      const targetEl: HTMLElement = document.getElementById('user-dropdown')!;
      const triggerEl: HTMLElement =
        document.getElementById('user-menu-button')!;
      const collapse: CollapseInterface = new Collapse(targetEl, triggerEl);
      collapse.toggle();
      return;
    }
    this.modal.openModal();
  }
}
