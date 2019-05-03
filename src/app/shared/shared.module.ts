import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { OrderService } from 'app/order/order.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [InputComponent, RadioComponent, RatingComponent, SnackbarComponent],
  
  /*
A exportação dos módulos CommonModule, FormsModule, ReactiveFormsModule enxuga quem utilizar o shared module,
porque não precisará mais importar esses módulos exportados aqui.
*/

  // serão exportados para quem utilizar esse modulo.
  exports: [
    InputComponent, 
    RadioComponent, 
    RatingComponent,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    SnackbarComponent   // o angular-cli é inteligente para detectar quando criar um componente dentro do shared.module
  ] 
})
export class SharedModule { 

  // essa configuração tornará o core.module obsoleto.
  // permite configurar um module de modo diferente, onde no componente raiz app.module
  // importa shared.module + os providers e no orderComponent importa somente o shared.module sem os providers
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ShoppingCartService,
        RestaurantsService,
        OrderService, 
        NotificationService
      ]
    }
  }

}



