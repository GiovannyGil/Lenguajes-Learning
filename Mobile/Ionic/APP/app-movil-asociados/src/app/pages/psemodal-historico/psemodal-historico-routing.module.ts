import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PSEModalHistoricoPage } from './psemodal-historico.page';

const routes: Routes = [
  {
    path: '',
    component: PSEModalHistoricoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PSEModalHistoricoPageRoutingModule {}
