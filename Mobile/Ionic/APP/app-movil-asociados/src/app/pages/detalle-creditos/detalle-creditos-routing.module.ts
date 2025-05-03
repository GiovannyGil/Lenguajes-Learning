import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleCreditosPage } from './detalle-creditos.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleCreditosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleCreditosPageRoutingModule {}
