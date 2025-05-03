import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegundaClavePageRoutingModule } from './segunda-clave-routing.module';

import { SegundaClavePage } from './segunda-clave.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegundaClavePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SegundaClavePage]
})
export class SegundaClavePageModule {}
