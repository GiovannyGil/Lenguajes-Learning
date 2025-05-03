import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoCuentasPage } from './estado-cuentas.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoCuentasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoCuentasPageRoutingModule {}
