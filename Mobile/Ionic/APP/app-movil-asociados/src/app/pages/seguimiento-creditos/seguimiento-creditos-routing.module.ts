import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeguimientoCreditosPage } from './seguimiento-creditos.page';

const routes: Routes = [
  {
    path: '',
    component: SeguimientoCreditosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguimientoCreditosPageRoutingModule {}
