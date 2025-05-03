import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreseguimientoCreditosPageRoutingModule } from './preseguimiento-creditos-routing.module';

import { PreseguimientoCreditosPage } from './preseguimiento-creditos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreseguimientoCreditosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PreseguimientoCreditosPage]
})
export class PreseguimientoCreditosPageModule {}
