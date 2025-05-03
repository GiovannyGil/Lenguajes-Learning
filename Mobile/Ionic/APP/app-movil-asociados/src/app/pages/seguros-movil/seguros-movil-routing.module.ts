import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegurosMovilPage } from './seguros-movil.page';

const routes: Routes = [
  {
    path: '',
    component: SegurosMovilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegurosMovilPageRoutingModule {}
