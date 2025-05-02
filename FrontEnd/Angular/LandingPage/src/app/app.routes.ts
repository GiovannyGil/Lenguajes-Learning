import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {path: '', component: HomeComponent}, // default route
    {path: 'products', component: ProductsComponent}, // products route
    {path: 'products/:id', component: ProductDetailComponent}, // products detail route'}
    {path: 'contact', component: ContactComponent}, // contact route'}
];
 