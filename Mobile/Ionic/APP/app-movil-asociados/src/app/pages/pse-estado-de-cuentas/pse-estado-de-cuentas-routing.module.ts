import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PSEEstadoDeCuentasPage } from './pse-estado-de-cuentas.page';

const routes: Routes = [
  {
    path: '',
    component: PSEEstadoDeCuentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PSEEstadoDeCuentasPageRoutingModule {}
