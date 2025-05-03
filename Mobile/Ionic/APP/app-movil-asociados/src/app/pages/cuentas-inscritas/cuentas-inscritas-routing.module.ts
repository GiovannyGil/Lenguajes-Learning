import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuentasInscritasPage } from './cuentas-inscritas.page';

const routes: Routes = [
  {
    path: '',
    component: CuentasInscritasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuentasInscritasPageRoutingModule {}
