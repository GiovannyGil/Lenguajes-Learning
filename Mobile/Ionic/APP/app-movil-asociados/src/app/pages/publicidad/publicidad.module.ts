import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicidadPageRoutingModule } from './publicidad-routing.module';

import { PublicidadPage } from './publicidad.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicidadPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PublicidadPage]
})
export class PublicidadPageModule {}
