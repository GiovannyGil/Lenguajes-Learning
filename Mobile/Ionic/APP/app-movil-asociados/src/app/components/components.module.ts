import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CreditosDigitalesComponent } from './creditos-digitales/creditos-digitales';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    CreditosDigitalesComponent,
    PageNotFoundComponent
  ],
  exports:[
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    CreditosDigitalesComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
 
  ]
})
export class ComponentsModule { }
