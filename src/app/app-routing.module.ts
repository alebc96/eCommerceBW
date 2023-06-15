import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { CartPageComponent } from './components/cart/cart-page/cart-page.component';
import { ProductDetailsComponent } from './components/home/product-details/product-details.component';
import { ProductsListComponent } from './components/home/products/products-list/products-list.component';
import { CreateProductComponent } from './components/manager/create-product/create-product.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { actorRoleGuard } from './guards/actor-role.guard';

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "create-product",
    component: CreateProductComponent,
    canActivate: [actorRoleGuard], data: {expectedRole: 'ADMIN'}
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "products",
    children: [
      {path: '', component: ProductsListComponent},
      {path: ':id', component: ProductDetailsComponent}
    ]
  },
  {
    path: "cart",
    component: CartPageComponent
  },
  {
    path: "**",
    redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
