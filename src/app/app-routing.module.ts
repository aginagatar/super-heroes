import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'tabla-listado',
        pathMatch: 'full',
      },
      {
        path: 'basic',
        loadChildren: () =>
          import('./superheroes/ui-elements/ui-basic/ui-basic.module').then(
            (m) => m.UiBasicModule,
          ),
      },
      {
        path: 'formulario',
        loadChildren: () =>
          import('./superheroes/pages/formulario/formulario.module').then(
            (m) => m.FormularioModule,
          ),
      },
      {
        path: 'tabla-listado',
        loadChildren: () =>
          import('./superheroes/pages/tabla-listado/tabla-listado.module').then(
            (m) => m.TablaListadoModule,
          ),
      },
      {
        path: 'apexchart',
        loadComponent: () =>
          import('./superheroes/chart/apex-chart/apex-chart.component'),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
