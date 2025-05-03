import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagosNominaPageRoutingModule } from './pagos-nomina-routing.module';

import { PagosNominaPage } from './pagos-nomina.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagosNominaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [PagosNominaPage]
})
export class PagosNominaPageModule {}
