import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperacionClavePage } from './recuperacion-clave.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperacionClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperacionClavePageRoutingModule {}
