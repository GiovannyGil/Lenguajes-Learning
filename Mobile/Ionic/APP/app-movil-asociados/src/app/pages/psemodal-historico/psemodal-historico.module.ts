import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PSEModalHistoricoPageRoutingModule } from './psemodal-historico-routing.module';

import { PSEModalHistoricoPage } from './psemodal-historico.page';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PSEModalHistoricoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PSEModalHistoricoPage]
})
export class PSEModalHistoricoPageModule {}
