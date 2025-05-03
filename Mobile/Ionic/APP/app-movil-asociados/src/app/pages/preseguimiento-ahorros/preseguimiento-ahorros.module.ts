import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreseguimientoAhorrosPageRoutingModule } from './preseguimiento-ahorros-routing.module';

import { PreseguimientoAhorrosPage } from './preseguimiento-ahorros.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreseguimientoAhorrosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PreseguimientoAhorrosPage]
})
export class PreseguimientoAhorrosPageModule {}
