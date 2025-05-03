import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PSEEstadoDeCuentasPageRoutingModule } from './pse-estado-de-cuentas-routing.module';

import { PSEEstadoDeCuentasPage } from './pse-estado-de-cuentas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PSEEstadoDeCuentasPageRoutingModule,
    ComponentsModule

  ],
  declarations: [PSEEstadoDeCuentasPage]
})
export class PSEEstadoDeCuentasPageModule {}
