import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguimientoAhorrosPage } from './seguimiento-ahorros.page';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoAhorrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguimientoAhorrosPageRoutingModule {}
