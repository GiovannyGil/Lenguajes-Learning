import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimuladorAhorrosPageRoutingModule } from './simulador-ahorros-routing.module';

import { SimuladorAhorrosPage } from './simulador-ahorros.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimuladorAhorrosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SimuladorAhorrosPage]
})
export class SimuladorAhorrosPageModule {}
