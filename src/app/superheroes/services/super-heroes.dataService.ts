import { Injectable } from '@angular/core';
import { Superheroe } from '../model/superheroe.model';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesDataService {

  private Superheroe: Superheroe;

  constructor() {}

  public getSuperheroe(): Superheroe {
  //   this.superHeroe =
  //   {
  //     "nombre": "batman",
  //     "genero": "M",
  //     "colorOjos": "V",
  //     "superpoderes": [
  //         "TQ",
  //         "SF",
  //         "IN"
  //     ],
  //     "fechaNacimiento": new Date('1951-11-09T23:00:00.000Z'),
  //     "color": "#a09bc2",
  //     "id": "06cb6206b79bb345237e"
  // };
    return this.Superheroe;
  }
  public setSuperheroe(Superheroe: Superheroe) {
    this.Superheroe = Superheroe;
  }
}
