import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegurosVidaPageRoutingModule } from './seguros-vida-routing.module';

import { SegurosVidaPage } from './seguros-vida.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegurosVidaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SegurosVidaPage]
})
export class SegurosVidaPageModule {}
