import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { AuthenticatorJWTService } from "../Auth/authenticator-jwt.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service: AuthenticatorJWTService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token=this.service.getToken();
    if(token!=""){
        request= request.clone({
          setHeaders:{
            Authorization: `Bearer ${token}`
          }
        });
    }
    return next.handle(request);
  }
}