import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoCreditosPage } from './pago-creditos.page';

const routes: Routes = [
  {
    path: '',
    component: PagoCreditosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoCreditosPageRoutingModule {}
