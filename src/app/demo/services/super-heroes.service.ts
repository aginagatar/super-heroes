import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {

  private endpoint = 'https://cabb2dad75df47babd30s.free.beeceptor.com/api/';

  constructor(public http: HttpClient) {}

  getSuperHeroes(): Observable<any> {
    return this.http.get(this.endpoint + 'superheroes');
  }

  crearSuperHeroe(sh: any): Observable<any> {
    console.log(sh);
    let datos = {
      nombre: sh.nombre,
      genero: sh.genero,
      colorOjos: sh.colorOjos,
      superpoderes: sh.superpoderes,
      fechaNacimiento: sh.fechaNacimiento
    };
    // const datuak = JSON.stringify(datos);
    return this.http.post(this.endpoint + 'superheroes', datos).pipe(
      tap((data: any) => {
        return data;
      })
    );
  }
}
