import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
=======
>>>>>>> parent of 6ce8390... Added authentication (JWT) (register + login), interceptor, route guard
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {CartService} from './services/cart.service';
<<<<<<< HEAD
import {SearchBarService} from './services/search-bar.service';
import {ProductCategoryMenuService} from './services/product-category-menu.service';
import {AuthServiceService} from './services/auth-service.service';
import {InterceptorService} from './services/interceptor.service';
import {AuthGuardService} from './services/auth-guard.service';
=======
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {CartService} from './services/cart.service';
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
=======
>>>>>>> parent of 6ce8390... Added authentication (JWT) (register + login), interceptor, route guard
import { Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
<<<<<<< HEAD
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// route order: specific to generic (order of precedence in case of clash)
const routes: Routes = 
[
  {path: "login", component: AuthComponentComponent},
  {path: "register", component: RegisterComponent},
=======

// route order: specific to generic (order of precedence in case of clash)
const routes: Routes = [
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
=======

// route order: specific to generic (order of precedence in case of clash)
const routes: Routes = [
>>>>>>> parent of 6ce8390... Added authentication (JWT) (register + login), interceptor, route guard
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
<<<<<<< HEAD
<<<<<<< HEAD
  {path: '**', redirectTo: '/login', pathMatch: 'full'} // ** is the generic wildcard that will match if nothing matches
=======
  {path: '**', redirectTo: '/products', pathMatch: 'full'} // ** is the generic wildcard that will match if nothing matches
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
=======
  {path: '**', redirectTo: '/products', pathMatch: 'full'} // ** is the generic wildcard that will match if nothing matches
>>>>>>> parent of 6ce8390... Added authentication (JWT) (register + login), interceptor, route guard
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    CartDetailsComponent,
    AuthComponentComponent,
    LogoutComponent,
    RegisterComponent
=======
    CartDetailsComponent
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
=======
    CartDetailsComponent
>>>>>>> parent of 6ce8390... Added authentication (JWT) (register + login), interceptor, route guard
  ],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    BrowserModule,
    HttpClientModule,
<<<<<<< HEAD
<<<<<<< HEAD
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, CartService, AuthServiceService, AuthGuardService, LogoutService, InterceptorService,
    SearchBarService, ProductCategoryMenuService, CartStatusService], // list of dependencies
=======
    NgbModule
  ],
  providers: [ProductService, CartService], // list of dependencies
>>>>>>> f96ce675f9be1d6a30e70a19aebe187be7d66e4d
=======
    NgbModule
  ],
  providers: [ProductService, CartService], // list of dependencies
>>>>>>> parent of 6ce8390... Added authentication (JWT) (register + login), interceptor, route guard
  bootstrap: [AppComponent]
})
export class AppModule { }
