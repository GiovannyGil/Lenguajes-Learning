import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegurosVehiculosPage } from './seguros-vehiculos.page';

const routes: Routes = [
  {
    path: '',
    component: SegurosVehiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegurosVehiculosPageRoutingModule {}
