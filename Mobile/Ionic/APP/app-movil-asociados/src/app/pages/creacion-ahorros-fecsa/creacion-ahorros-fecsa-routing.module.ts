import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreacionAhorrosFecsaPage } from './creacion-ahorros-fecsa.page';

const routes: Routes = [
  {
    path: '',
    component: CreacionAhorrosFecsaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreacionAhorrosFecsaPageRoutingModule {}
