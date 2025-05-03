import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleAhorrosPageRoutingModule } from './detalle-ahorros-routing.module';

import { DetalleAhorrosPage } from './detalle-ahorros.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleAhorrosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleAhorrosPage]
})
export class DetalleAhorrosPageModule {}
