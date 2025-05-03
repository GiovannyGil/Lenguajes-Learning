import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrasladoAhorrosPageRoutingModule } from './traslado-ahorros-routing.module';

import { TrasladoAhorrosPage } from './traslado-ahorros.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrasladoAhorrosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [TrasladoAhorrosPage]
})
export class TrasladoAhorrosPageModule {}
