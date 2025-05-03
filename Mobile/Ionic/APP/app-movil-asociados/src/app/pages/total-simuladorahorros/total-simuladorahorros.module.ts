import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotalSimuladorahorrosPageRoutingModule } from './total-simuladorahorros-routing.module';

import { TotalSimuladorahorrosPage } from './total-simuladorahorros.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotalSimuladorahorrosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TotalSimuladorahorrosPage]
})
export class TotalSimuladorahorrosPageModule {}
