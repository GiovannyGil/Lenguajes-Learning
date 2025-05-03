import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearConvenioPageRoutingModule } from './crear-convenio-routing.module';

import { CrearConvenioPage } from './crear-convenio.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearConvenioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CrearConvenioPage]
})
export class CrearConvenioPageModule {}
