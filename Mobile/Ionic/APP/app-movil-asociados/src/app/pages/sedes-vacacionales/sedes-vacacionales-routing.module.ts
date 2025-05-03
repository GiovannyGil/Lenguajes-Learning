import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SedesVacacionalesPage } from './sedes-vacacionales.page';

const routes: Routes = [
  {
    path: '',
    component: SedesVacacionalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SedesVacacionalesPageRoutingModule {}
