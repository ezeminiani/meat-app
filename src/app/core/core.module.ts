/*
Obsoleto porque dentro do shared.module existe o forRoot (ModuleWithProviders)
que já contem os providers.


import { NgModule } from '@angular/core';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { OrderService } from 'app/order/order.service';

// para não mexer nos caminhos utilizados optou-se por utilizar um Core module para agregar os serviços

@NgModule({
  providers: [
    ShoppingCartService,
    RestaurantsService, 
    OrderService
  ]
})
export class CoreModule { }
*/