import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrasladoTercerosPage } from './traslado-terceros.page';

const routes: Routes = [
  {
    path: '',
    component: TrasladoTercerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrasladoTercerosPageRoutingModule {}
