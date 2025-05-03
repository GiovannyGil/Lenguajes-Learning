import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimientoAhorrosPageRoutingModule } from './seguimiento-ahorros-routing.module';

import { SeguimientoAhorrosPage } from './seguimiento-ahorros.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimientoAhorrosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SeguimientoAhorrosPage]
})
export class SeguimientoAhorrosPageModule {}
