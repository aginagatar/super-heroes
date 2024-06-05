// src/app/services/textos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextosService {
  private baseUrl = 'assets/textos/textos-';

  constructor(private http: HttpClient) {}

  getTextos(idioma: string): Observable<any> {
    const url = `${this.baseUrl}${idioma}.json`;
    return this.http.get<any>(url);
  }
}
