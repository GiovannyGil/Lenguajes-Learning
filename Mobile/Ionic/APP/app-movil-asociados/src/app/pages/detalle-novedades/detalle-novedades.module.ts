import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleNovedadesPageRoutingModule } from './detalle-novedades-routing.module';

import { DetalleNovedadesPage } from './detalle-novedades.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleNovedadesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleNovedadesPage]
})
export class DetalleNovedadesPageModule {}
