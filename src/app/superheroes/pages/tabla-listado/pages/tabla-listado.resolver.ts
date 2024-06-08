import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { catchError, of } from 'rxjs';
import { SuperHeroesService } from 'src/app/superheroes/services/super-heroes.service';

@Injectable({
  providedIn: 'root'
})
export class TablaListadoResolver implements Resolve<any> {
  constructor(private superHeroesService: SuperHeroesService) {}

  resolve() {
    return this.superHeroesService.getSuperHeroes().pipe(
      catchError(error => {
        return of(null);
      })
    );
  }
}
