import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrasladoAhorrosPage } from './traslado-ahorros.page';

const routes: Routes = [
  {
    path: '',
    component: TrasladoAhorrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrasladoAhorrosPageRoutingModule {}
