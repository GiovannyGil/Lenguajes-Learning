import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetirosGanaPageRoutingModule } from './retiros-gana-routing.module';

import { RetirosGanaPage } from './retiros-gana.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetirosGanaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [RetirosGanaPage]
})
export class RetirosGanaPageModule {}
