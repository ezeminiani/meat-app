import {Routes} from '@angular/router'
import { HomeComponent } from './home/home.component';
//import { AboutComponent } from './about/about.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderComponent } from './order/order.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    //{path: 'about', component: AboutComponent},                           // retirado do componente principal e separado em modulo.
    
    {path: 'about', loadChildren: './about/about.module#AboutModule'},      // ao acionar a rota que carregará o modulo (lazy loading).
    
    {path: 'restaurants', component: RestaurantsComponent},
    
    {path: 'restaurants/:id', component: RestaurantDetailComponent, 
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
    ]},
    
    //{path: 'order', component: OrderComponent},
    {path: 'order', loadChildren: './order/order.module#OrderModule'},      // ao acionar a rota que carregará o modulo (lazy loading).
    
    {path: 'order-summary', component: OrderSummaryComponent},

    // rota de wildcard para not-found tem que colocar no final porque o Angular assim 
    // que encontrar uma rota específica vai direcionar. Essa rota not-found é a mais generica possível.
    {path: '**', component: NotFoundComponent}
]