import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';

import { CartPageComponent } from './components/cart/cart-page/cart-page.component';
import { ProductsListComponent } from './components/home/products/products-list/products-list.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from './components/home/product-card/product-card.component';
import { FooterPageComponent } from './components/footer/footer-page/footer-page.component';
import { CartItemComponent } from './components/cart-item/cart-item.component'
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailsComponent } from './components/home/product-details/product-details.component';
import { CreateProductComponent } from './components/manager/create-product/create-product.component';
import { ProductsTableComponent } from './components/manager/products-table/products-table.component';
import { FiltersComponent } from './components/filters/filters.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environments';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductsListComponent,
    CartPageComponent,
    HeaderComponent,
    ProductCardComponent,
    FooterPageComponent,
    CartItemComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    ProductsTableComponent,
    FiltersComponent,
    LoginComponent,
    RegisterComponent,
    SpinnerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig) // configuracion de firebase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
