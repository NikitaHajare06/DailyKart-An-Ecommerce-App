import { RouterModule, Routes } from '@angular/router';
import { ProductList } from './features/products/product-list/product-list';
import { Cart } from './features/cart/cart';
import { NgModule } from '@angular/core';
import { LoginComponent } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Home } from './features/home/home/home';

export const routes: Routes = [

{ path: '', component: Home },
{ path: 'productlist', component: ProductList },
  { path: 'cart', component: Cart },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
