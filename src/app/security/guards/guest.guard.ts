import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, catchError, first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthenticatorJWTService } from '../Auth/authenticator-jwt.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticatorJWTService) {}

  canActivate(): Observable<boolean> {
    return this.authService.getAuthenticationState().pipe(
      first(),
      map(authState => {
        if (authState.role === 'anonimous') {
          return true;
        } else {
          this.router.navigate(['/']); 
          return false; 
        }
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
