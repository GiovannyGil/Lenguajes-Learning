import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrasladoTercerosPageRoutingModule } from './traslado-terceros-routing.module';

import { TrasladoTercerosPage } from './traslado-terceros.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrasladoTercerosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [TrasladoTercerosPage]
})
export class TrasladoTercerosPageModule {}
