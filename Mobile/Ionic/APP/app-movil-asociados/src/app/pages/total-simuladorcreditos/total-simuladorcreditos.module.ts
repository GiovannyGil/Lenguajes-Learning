import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TotalSimuladorcreditosPageRoutingModule } from './total-simuladorcreditos-routing.module';

import { TotalSimuladorcreditosPage } from './total-simuladorcreditos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TotalSimuladorcreditosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TotalSimuladorcreditosPage]
})
export class TotalSimuladorcreditosPageModule {}
