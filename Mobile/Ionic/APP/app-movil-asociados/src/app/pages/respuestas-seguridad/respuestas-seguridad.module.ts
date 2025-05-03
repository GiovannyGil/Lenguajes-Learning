import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespuestasSeguridadPageRoutingModule } from './respuestas-seguridad-routing.module';

import { RespuestasSeguridadPage } from './respuestas-seguridad.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespuestasSeguridadPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [RespuestasSeguridadPage]
})
export class RespuestasSeguridadPageModule {}
