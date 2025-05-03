import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreseguimientoNovedadesPageRoutingModule } from './preseguimiento-novedades-routing.module';

import { PreseguimientoNovedadesPage } from './preseguimiento-novedades.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreseguimientoNovedadesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PreseguimientoNovedadesPage]
})
export class PreseguimientoNovedadesPageModule {}
