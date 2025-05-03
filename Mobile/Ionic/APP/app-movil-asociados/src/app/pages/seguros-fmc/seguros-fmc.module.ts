import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegurosFmcPageRoutingModule } from './seguros-fmc-routing.module';

import { SegurosFmcPage } from './seguros-fmc.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegurosFmcPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SegurosFmcPage]
})
export class SegurosFmcPageModule {}
