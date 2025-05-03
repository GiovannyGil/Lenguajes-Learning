import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetirosGanaPage } from './retiros-gana.page';

const routes: Routes = [
  {
    path: '',
    component: RetirosGanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetirosGanaPageRoutingModule {}
