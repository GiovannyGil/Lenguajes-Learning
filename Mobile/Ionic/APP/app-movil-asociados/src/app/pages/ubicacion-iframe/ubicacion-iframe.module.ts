import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbicacionIframePageRoutingModule } from './ubicacion-iframe-routing.module';

import { UbicacionIframePage } from './ubicacion-iframe.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UbicacionIframePageRoutingModule,
    ComponentsModule
  ],
  declarations: [UbicacionIframePage]
})
export class UbicacionIframePageModule {}
