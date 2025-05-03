import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmarLoginPageRoutingModule } from './confirmar-login-routing.module';

import { ConfirmarLoginPage } from './confirmar-login.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmarLoginPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ConfirmarLoginPage]
})
export class ConfirmarLoginPageModule {}
