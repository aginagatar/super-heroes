import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, fromEvent, map } from 'rxjs';
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

  constructor(private superHeroesService: SuperHeroesService) {}

  ngOnInit() {
    this.superHeroesService.getSuperHeroes().subscribe(res => {
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

  calcularEdad(timestamp) {
    const birthDate = new Date(timestamp * 1000);
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

}
