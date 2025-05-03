import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuxiliosPageRoutingModule } from './auxilios-routing.module';

import { AuxiliosPage } from './auxilios.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuxiliosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AuxiliosPage]
})
export class AuxiliosPageModule {}
