import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespuestasSeguridadPage } from './respuestas-seguridad.page';

const routes: Routes = [
  {
    path: '',
    component: RespuestasSeguridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespuestasSeguridadPageRoutingModule {}
