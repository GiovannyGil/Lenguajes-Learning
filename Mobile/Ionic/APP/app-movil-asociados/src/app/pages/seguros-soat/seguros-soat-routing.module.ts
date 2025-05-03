import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegurosSoatPage } from './seguros-soat.page';

const routes: Routes = [
  {
    path: '',
    component: SegurosSoatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegurosSoatPageRoutingModule {}
