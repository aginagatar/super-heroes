import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Comunes {

  constructor(private snackBar: MatSnackBar) {}

  aviso(mensaje: string) {
    this.snackBar.open(mensaje, null, {
      duration: 3000
    });
  }
}
