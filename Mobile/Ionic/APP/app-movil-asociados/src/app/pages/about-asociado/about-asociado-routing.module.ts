import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutAsociadoPage } from './about-asociado.page';

const routes: Routes = [
  {
    path: '',
    component: AboutAsociadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutAsociadoPageRoutingModule {}
