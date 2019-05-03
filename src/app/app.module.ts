import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
//import { AboutComponent } from './about/about.component'
import { ROUTES } from './app.routes';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component'
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';

//import { RestaurantsService } from './restaurants/restaurants.service';
//import { ShoppingCartService } from './restaurant-detail/shopping-cart/shopping-cart.service';
//import { OrderComponent } from './order/order.component';
//import { InputComponent } from './shared/input/input.component';
//import { RadioComponent } from './shared/radio/radio.component';
//import { OrderItemsComponent } from './order/order-items/order-items.component';
//import { OrderService } from './order/order.service';
//import { DeliveryCostsComponent } from './order/delivery-costs/delivery-costs.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SharedModule } from './shared/shared.module';
//import { CoreModule } from './core/core.module';
//import { RatingComponent } from './shared/rating/rating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component'
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    //AboutComponent,   // foi gerado modulo separado.
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    //OrderComponent,   // está no order.module
    //InputComponent,   // está no shared.module
    //RadioComponent,   // está no shared.module
    //OrderItemsComponent,    // está no order.module
    //DeliveryCostsComponent, // está no order.module
    OrderSummaryComponent,
    NotFoundComponent,
    //RatingComponent   // está no shared.module
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    //FormsModule,            // está no shared.module como exportado por ele.
    //ReactiveFormsModule,    // está no shared.module como exportado por ele.
    SharedModule.forRoot(),   // importa o shared.module + os providers definidos em forRoot, o que torna o core.module obsoleto.
    //CoreModule,
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})    // importar arquivo app.routes e preloadingStrategy pre-carrega os modulos em background

    // order.module não será importado aqui para ele é carregado lazy loading em app.routes
  ],
  providers: [
    //RestaurantsService,   // está no core.module
    //ShoppingCartService,  // está no core.module
    //OrderService,         // está no core.module
    //{provide: LocationStrategy, useClass: HashLocationStrategy},    // habilita a compatibilidade com AngularJS e coloca o # na url para que servidor Http não processe nada após o # e pare com os erros 404.
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],  // array de servicos
  bootstrap: [AppComponent]
})
export class AppModule { }
