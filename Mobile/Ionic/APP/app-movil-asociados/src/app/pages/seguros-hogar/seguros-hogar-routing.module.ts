import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegurosHogarPage } from './seguros-hogar.page';

const routes: Routes = [
  {
    path: '',
    component: SegurosHogarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegurosHogarPageRoutingModule {}
