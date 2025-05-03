import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimientoCreditosPageRoutingModule } from './seguimiento-creditos-routing.module';

import { SeguimientoCreditosPage } from './seguimiento-creditos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeguimientoCreditosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SeguimientoCreditosPage]
})
export class SeguimientoCreditosPageModule {}
