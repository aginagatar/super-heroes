import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesDataService {

  private superHeroe: any;

  constructor() {}

  public getSuperHeroe(): any {
    return this.superHeroe;
  }
  public setSuperHeroe(superHeroe: any) {
    this.superHeroe = superHeroe;
  }
}
