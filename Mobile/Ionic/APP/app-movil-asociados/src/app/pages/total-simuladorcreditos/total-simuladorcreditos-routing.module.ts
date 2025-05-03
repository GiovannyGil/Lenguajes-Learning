import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TotalSimuladorcreditosPage } from './total-simuladorcreditos.page';

const routes: Routes = [
  {
    path: '',
    component: TotalSimuladorcreditosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TotalSimuladorcreditosPageRoutingModule {}
