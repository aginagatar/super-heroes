import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './superheroes/layout/admin.component';

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
        path: 'tabla-listado',
        loadChildren: () =>
          import('./superheroes/pages/tabla-listado/tabla-listado.module').then(
            (m) => m.TablaListadoModule,
          ),
      },
      {
        path: 'formulario',
        loadChildren: () =>
          import('./superheroes/pages/formulario/formulario.module').then(
            (m) => m.FormularioModule,
          ),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
