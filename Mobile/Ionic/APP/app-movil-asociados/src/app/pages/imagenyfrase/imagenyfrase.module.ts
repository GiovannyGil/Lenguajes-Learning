import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenyfrasePageRoutingModule } from './imagenyfrase-routing.module';

import { ImagenyfrasePage } from './imagenyfrase.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenyfrasePageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ImagenyfrasePage]
})
export class ImagenyfrasePageModule {}
