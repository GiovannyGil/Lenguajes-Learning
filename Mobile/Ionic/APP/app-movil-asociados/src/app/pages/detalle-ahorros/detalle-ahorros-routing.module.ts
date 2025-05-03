import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleAhorrosPage } from './detalle-ahorros.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleAhorrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleAhorrosPageRoutingModule {}
