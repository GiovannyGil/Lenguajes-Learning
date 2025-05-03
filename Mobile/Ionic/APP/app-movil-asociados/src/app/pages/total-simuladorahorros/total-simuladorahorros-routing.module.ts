import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotalSimuladorahorrosPage } from './total-simuladorahorros.page';

const routes: Routes = [
  {
    path: '',
    component: TotalSimuladorahorrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotalSimuladorahorrosPageRoutingModule {}
