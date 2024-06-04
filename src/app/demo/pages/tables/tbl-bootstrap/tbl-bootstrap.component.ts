import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, fromEvent, map } from 'rxjs';
import { generos, ojos, superpoderes } from 'src/app/demo/core/constantes';
import { SuperHeroesService } from 'src/app/demo/services/super-heroes.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationsExampleDialog } from '../../dialogs/dialog-animations-example-dialog';

@Component({
  selector: 'app-tbl-bootstrap',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './tbl-bootstrap.component.html',
  styleUrls: ['./tbl-bootstrap.component.scss'],
})
export default class TblBootstrapComponent implements OnInit {

  public superHeroes: any;
  public superHeroesFiltrado: any;
  searchTable: string = '';
  searchControl: FormControl = new FormControl('');
  public tablaEditable: boolean;

  private superheroesssss =
  [
    {
        "nombre": "spiderman",
        "genero": "M",
        "colorOjos": "A",
        "superpoderes": [
            "VU",
            "TP",
            "RX"
        ],
        "fechaNacimiento": "1938-11-09T23:00:00.000Z",
        "color": "#6663d6",
        "id": "06cb6206b79bbfd5237e"
    },
    {
      "nombre": "batman",
      "genero": "M",
      "colorOjos": "V",
      "superpoderes": [
          "TQ",
          "SF",
          "IN"
      ],
      "fechaNacimiento": "1951-11-09T23:00:00.000Z",
      "color": "#a09bc2",
      "id": "06cb6206b79bb345237e"
  }
];

  constructor(private superHeroesService: SuperHeroesService,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.superHeroesService.getSuperHeroes().subscribe(res => {
      console.log(res);
      this.superHeroes = res;
      // this.superHeroes = this.superheroesssss;
      this.superHeroesFiltrado = this.superHeroes;
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(1000)) // 1 second delay
      .subscribe(value => {
        this.searchTable = value;
        this.onSearch();
      });
  }

  editar(superHeroe: any) {
    console.log(superHeroe);
  }

  eliminar(superHeroe: any, enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
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
