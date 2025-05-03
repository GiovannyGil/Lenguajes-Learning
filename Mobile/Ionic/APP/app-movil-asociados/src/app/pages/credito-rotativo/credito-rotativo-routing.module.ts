import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditoRotativoPage } from './credito-rotativo.page';

const routes: Routes = [
  {
    path: '',
    component: CreditoRotativoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditoRotativoPageRoutingModule {}
