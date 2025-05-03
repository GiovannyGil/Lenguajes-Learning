import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentasInscritasPageRoutingModule } from './cuentas-inscritas-routing.module';

import { CuentasInscritasPage } from './cuentas-inscritas.page';
import { ComponentsModule } from 'src/app/components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentasInscritasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CuentasInscritasPage]
})
export class CuentasInscritasPageModule {}
