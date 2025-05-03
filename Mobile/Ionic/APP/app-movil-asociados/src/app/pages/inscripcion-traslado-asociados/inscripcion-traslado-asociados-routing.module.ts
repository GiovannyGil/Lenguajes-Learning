import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscripcionTrasladoAsociadosPage } from './inscripcion-traslado-asociados.page';

const routes: Routes = [
  {
    path: '',
    component: InscripcionTrasladoAsociadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscripcionTrasladoAsociadosPageRoutingModule {}
