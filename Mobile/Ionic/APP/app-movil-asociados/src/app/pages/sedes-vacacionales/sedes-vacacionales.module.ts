import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SedesVacacionalesPageRoutingModule } from './sedes-vacacionales-routing.module';

import { SedesVacacionalesPage } from './sedes-vacacionales.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SedesVacacionalesPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [SedesVacacionalesPage]
})
export class SedesVacacionalesPageModule {}
