import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SuperHeroe } from '../model/superHeroe.model';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {

  private endpoint = 'https://ca62a382e0f1c0c5062b.free.beeceptor.com/api/';

  constructor(public http: HttpClient) {}

  getSuperHeroes(): Observable<SuperHeroe[]> {
    return this.http.get(this.endpoint + 'superheroes').pipe(
      tap((data: SuperHeroe[]) => {
        return data;
      })
    );;
  }

  crearSuperHeroe(sh: SuperHeroe): Observable<SuperHeroe> {
    return this.http.post(this.endpoint + 'superheroes', sh).pipe(
      tap((data: SuperHeroe) => {
        return data;
      })
    );
  }

  editarSuperHeroe(sh: SuperHeroe): Observable<void> {
    let shModificado = {
      nombre: sh.nombre,
      genero: sh.genero,
      colorOjos: sh.colorOjos,
      superpoderes: sh.superpoderes,
      fechaNacimiento: sh.fechaNacimiento,
      color: sh.color
    };
    return this.http.put(this.endpoint + 'superheroes/' + sh.id, shModificado).pipe(
      tap((data: any) => {
        return data;
      })
    );
  }

  eliminarSuperHeroe(id: string): Observable<void> {
    return this.http.delete(this.endpoint + 'superheroes/' + id).pipe(
      tap((data: any) => {
        return data;
      })
    );
  }
}
