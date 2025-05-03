import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperacionClavePageRoutingModule } from './recuperacion-clave-routing.module';

import { RecuperacionClavePage } from './recuperacion-clave.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperacionClavePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [RecuperacionClavePage]
})
export class RecuperacionClavePageModule {}
