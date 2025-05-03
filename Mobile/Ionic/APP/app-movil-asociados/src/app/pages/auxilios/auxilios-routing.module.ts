import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuxiliosPage } from './auxilios.page';

const routes: Routes = [
  {
    path: '',
    component: AuxiliosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuxiliosPageRoutingModule {}
