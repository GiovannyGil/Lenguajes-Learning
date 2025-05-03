import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuxiliosRequisitosPageRoutingModule } from './auxilios-requisitos-routing.module';

import { AuxiliosRequisitosPage } from './auxilios-requisitos.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuxiliosRequisitosPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AuxiliosRequisitosPage]
})
export class AuxiliosRequisitosPageModule {}
