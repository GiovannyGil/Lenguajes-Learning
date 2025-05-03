import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecargasPageRoutingModule } from './recargas-routing.module';

import { RecargasPage } from './recargas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecargasPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [RecargasPage]
})
export class RecargasPageModule {}
