import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/ui/login/login.component';
import { ContactInfoComponent } from './components/shared/navbar/contact-info/contact-info.component';
import { RegisterComponent } from './components/ui/register/register.component';
import { NavbarLinkComponent } from './components/shared/navbar/navbar-link/navbar-link.component';
import { CartIconComponent } from './components/shared/navbar/cart-icon/cart-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ContactInfoComponent,
    RegisterComponent,
    NavbarLinkComponent,
    CartIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
