import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './services/product.service';
import {LogoutService} from './services/logout.service';
import {CartStatusService} from './services/cart-status.service';
import {CartService} from './services/cart.service';
import {SearchBarService} from './services/search-bar.service';
import {ProductCategoryMenuService} from './services/product-category-menu.service';
import {AuthServiceService} from './services/auth-service.service';
import {InterceptorService} from './services/interceptor.service';
import {AuthGuardService} from './services/auth-guard.service';
import { Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// route order: specific to generic (order of precedence in case of clash)
const routes: Routes = 
[
  {path: "login", component: AuthComponentComponent},
  {path: "register", component: RegisterComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'} // ** is the generic wildcard that will match if nothing matches
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    AuthComponentComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService, CartService, AuthServiceService, AuthGuardService, LogoutService, InterceptorService,
    SearchBarService, ProductCategoryMenuService, CartStatusService], // list of dependencies
  bootstrap: [AppComponent]
})
export class AppModule { }
