import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrasladoOtrosAsociadosPageRoutingModule } from './traslado-otros-asociados-routing.module';

import { TrasladoOtrosAsociadosPage } from './traslado-otros-asociados.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrasladoOtrosAsociadosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [TrasladoOtrosAsociadosPage]
})
export class TrasladoOtrosAsociadosPageModule {}
