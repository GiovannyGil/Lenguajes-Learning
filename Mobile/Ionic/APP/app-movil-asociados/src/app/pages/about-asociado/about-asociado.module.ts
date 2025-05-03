import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutAsociadoPageRoutingModule } from './about-asociado-routing.module';

import { AboutAsociadoPage } from './about-asociado.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutAsociadoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AboutAsociadoPage]
})
export class AboutAsociadoPageModule {}
