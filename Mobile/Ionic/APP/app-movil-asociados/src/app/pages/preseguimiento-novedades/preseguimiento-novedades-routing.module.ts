import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreseguimientoNovedadesPage } from './preseguimiento-novedades.page';

const routes: Routes = [
  {
    path: '',
    component: PreseguimientoNovedadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreseguimientoNovedadesPageRoutingModule {}
