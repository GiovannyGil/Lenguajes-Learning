import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetirosEfectyPageRoutingModule } from './retiros-efecty-routing.module';

import { RetirosEfectyPage } from './retiros-efecty.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetirosEfectyPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [RetirosEfectyPage]
})
export class RetirosEfectyPageModule {}
