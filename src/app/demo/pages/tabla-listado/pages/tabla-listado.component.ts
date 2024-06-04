import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, fromEvent, map } from 'rxjs';
import { generos, ojos, superpoderes } from 'src/app/demo/core/constantes';
import { SuperHeroesService } from 'src/app/demo/services/super-heroes.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuperHeroesDataService } from 'src/app/demo/services/super-heroes.dataService';
import { SuperHeroe } from 'src/app/demo/model/superHeroe.model';
import { Comunes } from 'src/app/demo/core/comunes';
import { Confirmacion } from '../../confirmacion/confirmacion';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-tabla-listado',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tabla-listado.component.html',
  styleUrls: ['./tabla-listado.component.scss'],
})
export default class TablaListadoComponent implements OnInit {

  public superHeroes: SuperHeroe[] = [];
  public superHeroesFiltrado: SuperHeroe[] = [];
  searchTable: string = '';
  searchControl: FormControl = new FormControl('');
  public tablaEditable: boolean;
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private superHeroesService: SuperHeroesService,
    private dialog: MatDialog,
    private router: Router,
    private superHeroesDataService: SuperHeroesDataService,
    private comunes: Comunes) {}

  ngOnInit() {
    this.superHeroesService.getSuperHeroes().subscribe(res => {
      console.log(res);
      this.superHeroes = res;
      this.superHeroesFiltrado = this.superHeroes;
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(1000)) // 1 second delay
      .subscribe(value => {
        this.searchTable = value;
        this.onSearch();
      });
  }

  editar(superHeroe: SuperHeroe) {
    this.superHeroesDataService.setSuperHeroe(superHeroe);
    this.router.navigate(['/formulario']);
  }

  crearSuperHeroe() {
    this.router.navigate(['/formulario']);
  }

  eliminar(superHeroe: SuperHeroe, enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(Confirmacion, {
      data: {
        nombre: superHeroe.nombre
      },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.superHeroesService.eliminarSuperHeroe(superHeroe.id).subscribe(res => {
          console.log(res);
          this.comunes.aviso('Se ha eliminado a ' + superHeroe.nombre);
        });
      }
    });
  }

  calcularEdad(data) {
    const date = new Date(data);
    const unixTimestamp = Math.floor(date.getTime() / 1000);
    const birthDate = new Date(unixTimestamp * 1000);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }


  onSearch(): void {
    console.log('Search query:', this.searchTable);
    // Perform your search logic here
    this.superHeroesFiltrado = this.superHeroes.filter(item =>
      item.nombre.toLowerCase().includes(this.searchTable.toLowerCase())
    );
    console.log('Filtered items:', this.superHeroesFiltrado);
  }

  getDescripcionGenero(value) {
    const genero = generos.find(ge => ge.value === value);
    return genero ? genero.genero : undefined;
  }

  getDescripcionOjos(value) {
    const ojo = ojos.find(oj => oj.value === value);
    return ojo ? ojo.color : undefined;
  }

  getDescripcionSuperpoderes(valores) {
    const superpoderesMap: { [key: string]: string } = {};
    superpoderes.forEach(superpoder => {
      superpoderesMap[superpoder.value] = superpoder.poder;
    });
    const poderes = valores.map(valor => superpoderesMap[valor]).filter(poder => poder !== undefined);
    return poderes.join(', ');
  }

}
