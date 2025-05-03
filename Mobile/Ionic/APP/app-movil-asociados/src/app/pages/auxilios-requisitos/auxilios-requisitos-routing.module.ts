import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuxiliosRequisitosPage } from './auxilios-requisitos.page';

const routes: Routes = [
  {
    path: '',
    component: AuxiliosRequisitosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuxiliosRequisitosPageRoutingModule {}
