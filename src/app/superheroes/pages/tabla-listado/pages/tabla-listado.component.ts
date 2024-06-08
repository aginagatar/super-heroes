import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, fromEvent, map, of } from 'rxjs';
import { generos, ojos, superpoderes } from 'src/app/superheroes/core/constantes';
import { SuperHeroesService } from 'src/app/superheroes/services/super-heroes.service';
import { SharedModule } from 'src/app/superheroes/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuperHeroesDataService } from 'src/app/superheroes/services/super-heroes.dataService';
import { Superheroe } from 'src/app/superheroes/model/superheroe.model';
import { Comunes } from 'src/app/superheroes/core/comunes';
import { Confirmacion } from '../../confirmacion/confirmacion';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TextosService } from 'src/app/superheroes/core/textos.service';

@Component({
  selector: 'app-tabla-listado',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tabla-listado.component.html',
  styleUrls: ['./tabla-listado.component.scss'],
})
export default class TablaListadoComponent implements OnInit {

  public superHeroes: Superheroe[] = [];
  public superHeroesFiltrado: Superheroe[] = [];
  searchTable: string = '';
  searchControl: FormControl = new FormControl('');
  public tablaEditable: boolean;
  color = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  public datosCargados: boolean;
  textos: any;
  public idioma = 'es';
  public error;

  constructor(private superHeroesService: SuperHeroesService,
    private dialog: MatDialog,
    private router: Router,
    private superHeroesDataService: SuperHeroesDataService,
    private comunes: Comunes,
    private textosService: TextosService) {}

  ngOnInit() {
    this.cargarTextos();
    this.superHeroesService.getSuperHeroes().pipe(
      catchError(error => {
        this.datosCargados = false;
        this.error = error;
        return of([]);
      })
    ).subscribe(
      res => {
        this.datosCargados = true;
        console.log(res);
        this.superHeroes = res;
        this.superHeroesFiltrado = this.superHeroes;
      }
    );

    // setTimeout(() => {
    //   this.idioma = 'en';
    //   this.cargarTextos();
    // }, 5000);

    this.searchControl.valueChanges
      .pipe(debounceTime(1000)) // 1 second delay
      .subscribe(value => {
        this.searchTable = value;
        this.onSearch();
      });
  }

  editar(superheroe: Superheroe) {
    this.superHeroesDataService.setSuperheroe(superheroe);
    this.router.navigate(['/formulario']);
  }

  crearSuperHeroe() {
    this.router.navigate(['/formulario']);
  }

  eliminar(superheroe: Superheroe, enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(Confirmacion, {
      data: {
        nombre: superheroe.nombre
      },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.superHeroesService.eliminarSuperHeroe(superheroe.id).subscribe(res => {
          console.log(res);
          this.comunes.aviso('Se ha eliminado a ' + superheroe.nombre);
          this.eliminarElementoLista(superheroe.id);
        });
      }
    });
  }

  eliminarElementoLista(id) {
    this.superHeroes = this.superHeroes.filter(superHeroe => superHeroe.id !== id);
    this.superHeroesFiltrado = this.superHeroes;
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
    poderes.sort((a, b) => a.localeCompare(b));
    return poderes.join(', ');
  }

  private cargarTextos() {
    this.textosService.getTextos(this.idioma).subscribe(data => {
      this.textos = data;
    });
  }

  onIdiomaChange(event: any) {
    this.idioma= event.value;
    this.cargarTextos();
  }
}
