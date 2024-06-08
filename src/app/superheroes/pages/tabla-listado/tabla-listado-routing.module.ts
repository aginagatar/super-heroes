import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaListadoResolver } from './pages/tabla-listado.resolver';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tabla-listado.component'),
    resolve: {
      data: TablaListadoResolver
    }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaListadoRoutingModule {}
