import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreacionAhorrosFecsaPageRoutingModule } from './creacion-ahorros-fecsa-routing.module';

import { CreacionAhorrosFecsaPage } from './creacion-ahorros-fecsa.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreacionAhorrosFecsaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [CreacionAhorrosFecsaPage]
})
export class CreacionAhorrosFecsaPageModule {}
