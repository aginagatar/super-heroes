import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {

  private endpoint = 'https://ca39fd60394b93f0ffdf.free.beeceptor.com/api/';

  constructor(public http: HttpClient) {}

  getSuperHeroes(): Observable<any>{
    return this.http.get(this.endpoint + 'users');
  }

  // getVentasDeCliente(id): Observable<any>{
  //   let datos = {
  //     id: id
  //   };
  //   const datuak = JSON.stringify(datos);
  //   return this.http.post("http://localhost/Ubide_Ardoak/bbdd/getVentasDeCliente.php", datuak).pipe(
  //     tap((data: any) => {
  //       return data;
  //     })
  //   );
  // }
}
