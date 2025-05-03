import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguimientoNovedadesPage } from './seguimiento-novedades.page';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoNovedadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguimientoNovedadesPageRoutingModule {}
