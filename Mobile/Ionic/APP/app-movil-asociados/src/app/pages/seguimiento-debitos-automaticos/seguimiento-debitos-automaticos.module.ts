import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimientoDebitosAutomaticosPageRoutingModule } from './seguimiento-debitos-automaticos-routing.module';

import { SeguimientoDebitosAutomaticosPage } from './seguimiento-debitos-automaticos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimientoDebitosAutomaticosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SeguimientoDebitosAutomaticosPage]
})
export class SeguimientoDebitosAutomaticosPageModule {}
