import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguimientoDebitosAutomaticosPage } from './seguimiento-debitos-automaticos.page';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoDebitosAutomaticosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguimientoDebitosAutomaticosPageRoutingModule {}
