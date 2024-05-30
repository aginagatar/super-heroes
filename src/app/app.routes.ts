import { Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado',
    pathMatch: 'full'
  },
  {
    path: 'listado',
    component: ListadoComponent,
  }
];
