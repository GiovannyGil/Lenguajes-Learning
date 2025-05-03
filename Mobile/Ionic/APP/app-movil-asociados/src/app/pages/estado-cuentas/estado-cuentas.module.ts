import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoCuentasPageRoutingModule } from './estado-cuentas-routing.module';

import { EstadoCuentasPage } from './estado-cuentas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoCuentasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EstadoCuentasPage]
})
export class EstadoCuentasPageModule {}
