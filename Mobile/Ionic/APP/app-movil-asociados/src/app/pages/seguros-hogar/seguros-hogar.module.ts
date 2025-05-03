import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SegurosHogarPageRoutingModule } from './seguros-hogar-routing.module';

import { SegurosHogarPage } from './seguros-hogar.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SegurosHogarPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SegurosHogarPage]
})
export class SegurosHogarPageModule {}
