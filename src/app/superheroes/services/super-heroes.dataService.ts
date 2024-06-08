import { Injectable } from '@angular/core';
import { Superheroe } from '../model/superheroe.model';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesDataService {

  private Superheroe: Superheroe;

  constructor() {}

  public getSuperheroe(): Superheroe {
    return this.Superheroe;
  }
  public setSuperheroe(Superheroe: Superheroe) {
    this.Superheroe = Superheroe;
  }
}
