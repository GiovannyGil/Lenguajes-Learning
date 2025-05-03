import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SegundaClavePage } from './segunda-clave.page';

const routes: Routes = [
  {
    path: '',
    component: SegundaClavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegundaClavePageRoutingModule {}
