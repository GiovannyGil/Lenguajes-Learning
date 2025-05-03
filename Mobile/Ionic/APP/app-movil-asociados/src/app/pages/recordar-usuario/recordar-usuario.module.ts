import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordarUsuarioPageRoutingModule } from './recordar-usuario-routing.module';

import { RecordarUsuarioPage } from './recordar-usuario.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordarUsuarioPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [RecordarUsuarioPage]
})
export class RecordarUsuarioPageModule {}
