import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscripcionTrasladoAsociadosPageRoutingModule } from './inscripcion-traslado-asociados-routing.module';

import { InscripcionTrasladoAsociadosPage } from './inscripcion-traslado-asociados.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscripcionTrasladoAsociadosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [InscripcionTrasladoAsociadosPage]
})
export class InscripcionTrasladoAsociadosPageModule {}
