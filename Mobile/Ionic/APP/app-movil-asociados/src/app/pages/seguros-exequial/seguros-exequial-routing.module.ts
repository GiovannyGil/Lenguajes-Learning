import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegurosExequialPage } from './seguros-exequial.page';

const routes: Routes = [
  {
    path: '',
    component: SegurosExequialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegurosExequialPageRoutingModule {}
