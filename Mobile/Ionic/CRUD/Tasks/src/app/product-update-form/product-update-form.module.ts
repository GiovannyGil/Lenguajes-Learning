import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductUpdateFormComponent } from './product-update-form.component';

@NgModule({
  declarations: [ProductUpdateFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [ProductUpdateFormComponent]
})
export class ProductUpdateFormModule {}
