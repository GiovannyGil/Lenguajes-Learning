import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasSeguridadPageRoutingModule } from './preguntas-seguridad-routing.module';

import { PreguntasSeguridadPage } from './preguntas-seguridad.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntasSeguridadPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [PreguntasSeguridadPage]
})
export class PreguntasSeguridadPageModule {}
