import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrasladoOtrosAsociadosPage } from './traslado-otros-asociados.page';

const routes: Routes = [
  {
    path: '',
    component: TrasladoOtrosAsociadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrasladoOtrosAsociadosPageRoutingModule {}
