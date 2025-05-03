import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimientoNovedadesPageRoutingModule } from './seguimiento-novedades-routing.module';

import { SeguimientoNovedadesPage } from './seguimiento-novedades.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimientoNovedadesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SeguimientoNovedadesPage]
})
export class SeguimientoNovedadesPageModule {}
