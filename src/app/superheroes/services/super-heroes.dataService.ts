import { Injectable } from '@angular/core';
import { SuperHeroe } from '../model/superHeroe.model';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesDataService {

  private superHeroe: SuperHeroe;

  constructor() {}

  public getSuperHeroe(): SuperHeroe {
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
    return this.superHeroe;
  }
  public setSuperHeroe(superHeroe: SuperHeroe) {
    this.superHeroe = superHeroe;
  }
}
