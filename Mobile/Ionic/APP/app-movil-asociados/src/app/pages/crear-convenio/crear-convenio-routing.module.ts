import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearConvenioPage } from './crear-convenio.page';

const routes: Routes = [
  {
    path: '',
    component: CrearConvenioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearConvenioPageRoutingModule {}
