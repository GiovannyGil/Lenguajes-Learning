import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegurosVidaPage } from './seguros-vida.page';

const routes: Routes = [
  {
    path: '',
    component: SegurosVidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegurosVidaPageRoutingModule {}
