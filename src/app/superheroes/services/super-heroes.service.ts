import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { SuperHeroe } from '../model/superHeroe.model';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {

  private endpoint = 'https://ca62a382e0f1c0c5062b.free.beeceptor.com/api/';

  constructor(public http: HttpClient) {}

  getSuperHeroes(): Observable<SuperHeroe[]> {
    return of([
      {
          "nombre": "spiderman",
          "genero": "M",
          "colorOjos": "A",
          "superpoderes": [
              "VU",
              "TP",
              "RX"
          ],
          "fechaNacimiento": new Date('1938-11-09T23:00:00.000Z'),
          "color": "#6663d6",
          "id": "06cb6206b79bbfd5237e"
      },
      {
        "nombre": "batman",
        "genero": "M",
        "colorOjos": "V",
        "superpoderes": [
            "TQ",
            "SF",
            "IN"
        ],
        "fechaNacimiento": new Date("1951-11-09T23:00:00.000Z"),
        "color": "#a09bc2",
        "id": "06cb6206b79bb345237e"
    }
  ]).pipe(delay(2000));
    return this.http.get(this.endpoint + 'superheroes').pipe(
      delay(3000),
      tap((data: SuperHeroe[]) => {
        return data;
      })
    );
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
