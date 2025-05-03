import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmarLoginPage } from './confirmar-login.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmarLoginPageRoutingModule {}
