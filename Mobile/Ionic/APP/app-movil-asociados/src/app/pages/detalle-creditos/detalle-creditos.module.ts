import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCreditosPageRoutingModule } from './detalle-creditos-routing.module';

import { DetalleCreditosPage } from './detalle-creditos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCreditosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [DetalleCreditosPage]
})
export class DetalleCreditosPageModule {}
