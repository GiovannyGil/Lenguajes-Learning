import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreseguimientoCreditosPage } from './preseguimiento-creditos.page';

const routes: Routes = [
  {
    path: '',
    component: PreseguimientoCreditosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreseguimientoCreditosPageRoutingModule {}
