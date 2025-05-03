import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreseguimientoAhorrosPage } from './preseguimiento-ahorros.page';

const routes: Routes = [
  {
    path: '',
    component: PreseguimientoAhorrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreseguimientoAhorrosPageRoutingModule {}
