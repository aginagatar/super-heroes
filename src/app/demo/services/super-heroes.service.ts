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
    return this.http.put(this.endpoint + 'superheroes/' + sh.id, sh).pipe(
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
