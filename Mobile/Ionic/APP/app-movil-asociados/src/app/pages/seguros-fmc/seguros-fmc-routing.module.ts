import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegurosFmcPage } from './seguros-fmc.page';

const routes: Routes = [
  {
    path: '',
    component: SegurosFmcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegurosFmcPageRoutingModule {}
