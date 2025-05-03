import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreguntasSeguridadPage } from './preguntas-seguridad.page';

const routes: Routes = [
  {
    path: '',
    component: PreguntasSeguridadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntasSeguridadPageRoutingModule {}
