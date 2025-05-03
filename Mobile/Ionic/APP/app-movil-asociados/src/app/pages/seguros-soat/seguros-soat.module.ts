import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegurosSoatPageRoutingModule } from './seguros-soat-routing.module';

import { SegurosSoatPage } from './seguros-soat.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegurosSoatPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SegurosSoatPage]
})
export class SegurosSoatPageModule {}
