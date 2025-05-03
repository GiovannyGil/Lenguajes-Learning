import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PseTransaccionpendientePageRoutingModule } from './pse-transaccionpendiente-routing.module';

import { PseTransaccionpendientePage } from './pse-transaccionpendiente.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PseTransaccionpendientePageRoutingModule,
    ComponentsModule
    
  ],
  declarations: [PseTransaccionpendientePage]
})
export class PseTransaccionpendientePageModule {}
