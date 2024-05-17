import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { UserClaim } from './user-claim';
import { LoginDTO } from '../DTOs/login-dto';
import { TokenDTO } from '../DTOs/token-dto';
import { GenericService } from '../../infrastructure/generic/generic-service';
import { ToastManager } from '../../components/shared/alerts/toast-manager';
import { jwtDecode } from 'jwt-decode';
import { AuthenticationState } from './authentication-state';
import { LocalStorageService } from '../helper/local-storage.service';
import { HttpResponseWrapper } from '../../infrastructure/generic/http-response-wrapper';
@Injectable({
  providedIn: 'root'
})
export class AuthenticatorJWTService {
  private URL_REQUEST:string="accounts/";
  private tokenkey:string="TOKEN_KEY";
  private anonimous:AuthenticationState={};

  constructor(private localStorage: LocalStorageService,private loginService:GenericService) { }

  public getAuthenticationState():Observable<AuthenticationState>{
      return this.localStorage.getItem(this.tokenkey).pipe(map(x=>this.decodeToken(x)))
  } 
  public login(user: LoginDTO): Observable<HttpResponseWrapper<string>> {
    return this.loginService.post<LoginDTO, TokenDTO>(user, this.URL_REQUEST + "login").pipe(
      switchMap(resp => {
        if (resp.getError()) {
          return of(new HttpResponseWrapper<string>(resp.getError(),resp.getResponseMessage()));
        }
        return this.localStorage.setItem(this.tokenkey, resp.getResponse()!.token).pipe(
          map(_ => new HttpResponseWrapper<string>(false,''))
        );
      })
    );
  }
  public loginWithToken(token:string):Observable<boolean>{
    return this.localStorage.setItem(this.tokenkey,token);
  }
  public logout(): Observable<boolean>{
    return this.localStorage.removeItem(this.tokenkey);
  }
  //este método le permite al interceptor de la las peticiones http recibir el token directamente
  public getToken():string{
    return this.localStorage.getToken(this.tokenkey);
  }


  private decodeToken(token: string): AuthenticationState {
    try {
      if(token==""){
        return {role:"anonimous"};
      }
      var decodedToken=jwtDecode<UserClaim>(token);
      return {role:decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
              firstName:decodedToken.FirstName,
              lastName:decodedToken.LastName,
              photo:decodedToken.Photo,
              expiration:decodedToken.exp
              };
    } catch (error) {
      return this.anonimous;
    }
  }

}

