import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpResponseWrapper } from "./http-response-wrapper";
import { Observable, catchError, map, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GenericService {
  private URL_BASE: string = `https://restromanagerbackend.azurewebsites.net/api/`; 
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  });

  constructor(private http: HttpClient) {
  }
  getAll<T>(path:string,pagination?:HttpParams): Observable<HttpResponseWrapper<T[]>> {
    return this.http.get<T[]>(this.URL_BASE+path, {headers:this.httpHeaders,params:pagination }).pipe(
      map((t:T[])=>new HttpResponseWrapper(false,'',t)),
      catchError(this.handleError<T[]>)
  );
  }
  getById<T>(path:string,id:string): Observable<HttpResponseWrapper<T>> {
      return this.http.get<T>(this.URL_BASE+path+id,{headers:this.httpHeaders}).pipe(
        map((t:T)=>new HttpResponseWrapper(false,'',t)),
        catchError(this.handleError<T>)
      );
  }
  getTotalPages(path:string,pagination:HttpParams): Observable<HttpResponseWrapper<number>> {
    return this.http.get<number>(this.URL_BASE+path+"totalPages", {headers:this.httpHeaders,params:pagination}).pipe(
      map((t:number)=>new HttpResponseWrapper(false,'',t)),
      catchError(this.handleError<number>)
    );
  }
  put<T,R>(t:T,path:string): Observable<HttpResponseWrapper<R>> {
    return this.http.put<R>(this.URL_BASE+path,t,{headers:this.httpHeaders}).pipe(
      map((r:R)=>new HttpResponseWrapper(false,'',r)),
      catchError(this.handleError<R>)
    );         
  }
  post<T,R>(t:T,path:string): Observable<HttpResponseWrapper<R>> {
    return this.http.post<R>(this.URL_BASE+path,t,{headers:this.httpHeaders}).pipe(
      map((r:R)=>new HttpResponseWrapper(false,'',r)),
      catchError(this.handleError<R>)
    );
  }
  delete(id:string,path:string): Observable<HttpResponseWrapper<Object>> {
    return this.http.delete(this.URL_BASE+path+id,{headers:this.httpHeaders}).pipe(
      map((t)=>new HttpResponseWrapper<Object>(false,'')),
      catchError(this.handleError<Object>)
    );
  }

  private handleError<C>(error: HttpErrorResponse) {
    if (error.status == HttpStatusCode.NotFound) {
      return of(new HttpResponseWrapper<C>(true,'Recurso no encontrado.'));
    } 
    if (error.status == HttpStatusCode.BadRequest) {
      const errorMessage = error.error ? error.error : 'Ha ocurrido un error.';
      return of(new HttpResponseWrapper<C>(true,errorMessage));
    } 
    if (error.status == HttpStatusCode.Unauthorized) {
      return of(new HttpResponseWrapper<C>(true,'Tienes que estar logueado para ejecutar esta operación.'));
    } 
    if (error.status == HttpStatusCode.Forbidden) {
      return of(new HttpResponseWrapper<C>(true,'No tienes permisos para hacer esta operación'));
    } 
    return of(new HttpResponseWrapper<C>(true,'Error desconocido'));
  }
  }