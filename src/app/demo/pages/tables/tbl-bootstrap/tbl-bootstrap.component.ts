import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, fromEvent, map } from 'rxjs';
import { ojos, superpoderes } from 'src/app/demo/core/constantes';
import { SuperHeroesService } from 'src/app/demo/services/super-heroes.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

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
        "id": "06cb6206b79bbfd5237e"
    }
];

  constructor(private superHeroesService: SuperHeroesService) {}

  ngOnInit() {
    // this.superHeroesService.getSuperHeroes().subscribe(res => {
    //   console.log(res);
    //   this.superHeroes = res;
      this.superHeroes = this.superheroesssss;
      this.superHeroesFiltrado = this.superHeroes;
    // });

    this.searchControl.valueChanges
      .pipe(debounceTime(1000)) // 1 second delay
      .subscribe(value => {
        this.searchTable = value;
        this.onSearch();
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

  getDescripcionOjos(value) {
    const eye = ojos.find(oj => oj.value === value);
    return eye ? eye.color : undefined;
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
