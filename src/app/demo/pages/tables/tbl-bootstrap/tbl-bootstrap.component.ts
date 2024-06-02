import { Component, OnInit } from '@angular/core';
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

  constructor(private superHeroesService: SuperHeroesService) {}

  ngOnInit() {
    this.superHeroesService.getSuperHeroes().subscribe(res => {
      this.superHeroes = res;
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

}
