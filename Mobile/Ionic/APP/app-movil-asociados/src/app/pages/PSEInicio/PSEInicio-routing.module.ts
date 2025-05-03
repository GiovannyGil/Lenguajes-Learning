import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PSEInicioPage } from './PSEInicio.page';

const routes: Routes = [
  {
    path: '',
    component: PSEInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PSEInicioPageRoutingModule {}
