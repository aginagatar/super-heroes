import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, fromEvent, map, of } from 'rxjs';
import { generos, ojos, superpoderes } from 'src/app/superheroes/core/constantes';
import { SuperHeroesService } from 'src/app/superheroes/services/super-heroes.service';
import { SharedModule } from 'src/app/superheroes/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  public searchTable: string = '';
  public searchControl: FormControl = new FormControl('');
  public tablaEditable: boolean;
  public colorSpinner = 'primary';
  public modeSpinner: ProgressSpinnerMode = 'indeterminate';
  public valueSpinner = 50;
  public datosCargados: boolean;
  public textos: any;
  public idioma = 'es';
  public mensajeError: boolean;

  constructor(private superHeroesService: SuperHeroesService,
    private dialog: MatDialog,
    private router: Router,
    private superHeroesDataService: SuperHeroesDataService,
    private comunes: Comunes,
    private textosService: TextosService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.cargarTextos();
    this.route.data.subscribe((res: {data: Superheroe[]}) => {
      this.datosCargados = true;
      if (res.data === null) {
        this.mensajeError = true;
      } else {
        this.superHeroes = res.data;
        this.superHeroesFiltrado = this.superHeroes;
      }
    });


    this.searchControl.valueChanges
      .pipe(debounceTime(1000)) // Delay de 1 segundo desde que deja de escribir
      .subscribe(value => {
        this.searchTable = value;
        this.onSearch();
      });
  }

  // Guarda superheroe y navega al form
  editar(superheroe: Superheroe) {
    this.superHeroesDataService.setSuperheroe(superheroe);
    this.router.navigate(['/formulario']);
  }

  //Navega al form
  crearSuperHeroe() {
    this.router.navigate(['/formulario']);
  }


  // Elimina superheroe
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
      if (result) {
        this.superHeroesService.eliminarSuperHeroe(superheroe.id).subscribe(res => {
          this.comunes.aviso('Se ha eliminado a ' + superheroe.nombre);
          this.eliminarElementoLista(superheroe.id);
        });
      }
    });
  }

  // Actualziar listado
  eliminarElementoLista(id) {
    this.superHeroes = this.superHeroes.filter(superHeroe => superHeroe.id !== id);
    this.superHeroesFiltrado = this.superHeroes;
  }

  // Edad superheroe
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


  // Búsqyueda de superheroe
  onSearch(): void {
    this.superHeroesFiltrado = this.superHeroes.filter(item =>
      item.nombre.toLowerCase().includes(this.searchTable.toLowerCase())
    );
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


  // Cambio de idioma
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
