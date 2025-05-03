import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoCreditosPageRoutingModule } from './pago-creditos-routing.module';

import { PagoCreditosPage } from './pago-creditos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoCreditosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [PagoCreditosPage]
})
export class PagoCreditosPageModule {}
