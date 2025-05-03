import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimuladorCreditosPage } from './simulador-creditos.page';

const routes: Routes = [
  {
    path: '',
    component: SimuladorCreditosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimuladorCreditosPageRoutingModule {}
