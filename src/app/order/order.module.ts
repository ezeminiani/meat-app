import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {path: '', component: OrderComponent}
]

@NgModule({
  imports: [
    SharedModule,   // SharedModule já importa CommonModule, FormsModule, ReactiveFormsModule. Não precisa importar aqui. O shared.module importa aqui sem o providers (sem o forRoot)
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    OrderComponent, 
    OrderItemsComponent, 
    DeliveryCostsComponent
  ]

  // O exports aqui não precisa porque o componente order.module não exportará nenhum componente para outro módulo,
  // diferente do shared.module que precisa exportar componentes.
})
export class OrderModule { }
