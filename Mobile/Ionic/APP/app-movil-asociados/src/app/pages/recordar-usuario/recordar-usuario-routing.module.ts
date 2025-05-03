import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordarUsuarioPage } from './recordar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: RecordarUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordarUsuarioPageRoutingModule {}
