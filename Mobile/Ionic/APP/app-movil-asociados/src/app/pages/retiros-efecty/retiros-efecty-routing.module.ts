import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetirosEfectyPage } from './retiros-efecty.page';

const routes: Routes = [
  {
    path: '',
    component: RetirosEfectyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetirosEfectyPageRoutingModule {}
