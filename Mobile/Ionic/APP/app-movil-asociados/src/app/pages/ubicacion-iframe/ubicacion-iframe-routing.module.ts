import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbicacionIframePage } from './ubicacion-iframe.page';

const routes: Routes = [
  {
    path: '',
    component: UbicacionIframePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbicacionIframePageRoutingModule {}
