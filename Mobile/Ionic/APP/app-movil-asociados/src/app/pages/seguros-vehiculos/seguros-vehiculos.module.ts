import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegurosVehiculosPageRoutingModule } from './seguros-vehiculos-routing.module';

import { SegurosVehiculosPage } from './seguros-vehiculos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegurosVehiculosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SegurosVehiculosPage]
})
export class SegurosVehiculosPageModule {}
