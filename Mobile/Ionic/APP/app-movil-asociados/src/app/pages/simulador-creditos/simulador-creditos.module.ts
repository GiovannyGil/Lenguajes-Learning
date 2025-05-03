import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimuladorCreditosPageRoutingModule } from './simulador-creditos-routing.module';

import { SimuladorCreditosPage } from './simulador-creditos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimuladorCreditosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SimuladorCreditosPage]
})
export class SimuladorCreditosPageModule {}
