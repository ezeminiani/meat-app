import { Injectable } from '@angular/core';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';

import { Order, OrderItem } from './order.model';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map'
import { MEAT_API } from 'app/app.api';


@Injectable()
export class OrderService {

  constructor(private shoppingCartService: ShoppingCartService, private http: Http) { }

  // o parametro shoppingCartService no construtor expoe algumas coisas já fornecidas pelo ShoppingCartService
  // por isso a implementacao desse serviço.

  itemsValue(): number {
    return this.shoppingCartService.total()
  }

  cartItems(): CartItem[] {
    return this.shoppingCartService.items
  }


  increaseQty(item: CartItem) {
    this.shoppingCartService.increaseQty(item)
  }


  decreaseQty(item: CartItem) {
    this.shoppingCartService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.shoppingCartService.removeItem(item)
  }


  // enviar a order para o backend e retornar um Observable que contem uma string (id da order)
  checkOrder(order: Order): Observable<string> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    return this.http.post(`${MEAT_API}/orders`, 
                          JSON.stringify(order), 
                          new RequestOptions({headers:headers}))
                    .map(response => response.json())     // o map transforma o objeto response em json
                    .map(order => order.id)               // transforma e retorna somente o ID do order
  }


  clear() {
    this.shoppingCartService.clear()
  }
}
