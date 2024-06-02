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

  constructor(private superHeroesService: SuperHeroesService) {}

  ngOnInit() {
    this.superHeroesService.getSuperHeroes().subscribe(res => {
      console.log(res);
    });
  }

}
