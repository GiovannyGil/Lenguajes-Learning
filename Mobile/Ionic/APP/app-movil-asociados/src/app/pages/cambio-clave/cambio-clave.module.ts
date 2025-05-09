import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioClavePageRoutingModule } from './cambio-clave-routing.module';

import { CambioClavePage } from './cambio-clave.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioClavePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [CambioClavePage]
})
export class CambioClavePageModule {}
