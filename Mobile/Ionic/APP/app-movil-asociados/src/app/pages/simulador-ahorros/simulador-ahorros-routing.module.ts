import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimuladorAhorrosPage } from './simulador-ahorros.page';

const routes: Routes = [
  {
    path: '',
    component: SimuladorAhorrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimuladorAhorrosPageRoutingModule {}
