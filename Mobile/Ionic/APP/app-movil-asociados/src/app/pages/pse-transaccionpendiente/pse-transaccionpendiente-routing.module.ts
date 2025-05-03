import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PseTransaccionpendientePage } from './pse-transaccionpendiente.page';

const routes: Routes = [
  {
    path: '',
    component: PseTransaccionpendientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PseTransaccionpendientePageRoutingModule {}
