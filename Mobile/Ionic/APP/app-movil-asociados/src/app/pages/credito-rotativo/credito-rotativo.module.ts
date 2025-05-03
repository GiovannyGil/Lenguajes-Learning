import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditoRotativoPageRoutingModule } from './credito-rotativo-routing.module';

import { CreditoRotativoPage } from './credito-rotativo.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditoRotativoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CreditoRotativoPage]
})
export class CreditoRotativoPageModule {}
