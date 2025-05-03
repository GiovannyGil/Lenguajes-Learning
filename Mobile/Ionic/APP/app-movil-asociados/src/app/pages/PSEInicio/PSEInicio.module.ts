import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PSEInicioPageRoutingModule } from './PSEInicio-routing.module';

import { PSEInicioPage } from './PSEInicio.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PSEInicioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PSEInicioPage]
})
export class PSEInicioPageModule {}
