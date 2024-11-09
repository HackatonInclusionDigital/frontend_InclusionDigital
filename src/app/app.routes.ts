import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterProductComponent } from './pages/register-product/register-product.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { CheckListComponent } from './pages/check-list/check-list.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register-product', component: RegisterProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent},
  { path: "check", component: CheckListComponent },
  { path: "register-user", component: RegisterUserComponent }
];
