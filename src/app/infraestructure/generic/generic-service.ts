import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";
import { HttpResponseWrapper } from "./http-response-wrapper";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class GenericService<T> {
    private URL_BASE: string = `https://localhost:7056/api/`; 
  
    private httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    });
  
    constructor(private http: HttpClient) {
  
    }
    getAll(path:string,pagination?:HttpParams): Observable<HttpResponseWrapper<T[]>> {
      return this.http.get<T[]>(this.URL_BASE+path, { headers: this.httpHeaders,params:pagination })
      .pipe(catchError(this.handleError)).pipe(map((t:T[])=>new HttpResponseWrapper(t,false,'')));
    }
    getById(path:string,id:string): Observable<HttpResponseWrapper<T>> {
        return this.http.get<T>(this.URL_BASE+path+id, { headers: this.httpHeaders })
        .pipe(catchError(this.handleError)).pipe(map((t:T)=>new HttpResponseWrapper(t,false,'')));
    }
    getTotalPages(path:string,pagination:HttpParams): Observable<HttpResponseWrapper<number>> {
        return this.http.get<number>(this.URL_BASE+path+"totalPages", { headers: this.httpHeaders,params:pagination})
        .pipe(catchError(this.handleError)).pipe(map((t:number)=>new HttpResponseWrapper(t,false,'')));
    }
    put(t:T,path:string): Observable<HttpResponseWrapper<T>> {
        return this.http.put<T>(this.URL_BASE+path,t,{ headers: this.httpHeaders }).pipe(
            catchError(this.handleError)).pipe(map((t:T)=>new HttpResponseWrapper(t,false,'')));         
    }
    post(t:T,path:string): Observable<HttpResponseWrapper<T>> {
      return this.http.post<T>(this.URL_BASE+path,t,{ headers: this.httpHeaders }).pipe(
          catchError(this.handleError)).pipe(map((t:T)=>new HttpResponseWrapper(t,false,'')));
    }
    delete(id:string,path:string): Observable<Object> {
      return this.http.delete(this.URL_BASE+path+id,{ headers: this.httpHeaders }).pipe(
          catchError(this.handleError)).pipe(map((t)=>new HttpResponseWrapper(t,false,'')));
    }
  
    private handleError(error: HttpErrorResponse) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
  }