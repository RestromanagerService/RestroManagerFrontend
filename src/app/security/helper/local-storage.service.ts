import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  setItem(key: string, value: string): Observable<boolean> {
    try {
      localStorage.setItem(key, value);
      return of(true); // Envuelve en un Observable
    } catch (error) {
      return of(false);
    }
  }

  getItem(key: string): Observable<string> {
      const value = localStorage.getItem(key);
      if(value != null){
        return of(value!);
      }
      return of("");
  }

  removeItem(key: string): Observable<boolean> {
    try {
      localStorage.removeItem(key);
      return of(true); // Envuelve en un Observable
    } catch (error) {
      return of(false);
    }
  }
  getToken(key:string):string{
    const value = localStorage.getItem(key);
    if(value!=null){
      return value;
    }
    return "";
  }
}
