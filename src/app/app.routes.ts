import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterProductComponent } from './pages/register-product/register-product.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register-product', component: RegisterProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
];
