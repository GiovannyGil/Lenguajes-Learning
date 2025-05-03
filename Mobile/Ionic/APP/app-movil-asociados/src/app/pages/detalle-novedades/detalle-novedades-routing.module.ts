import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleNovedadesPage } from './detalle-novedades.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleNovedadesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleNovedadesPageRoutingModule {}
