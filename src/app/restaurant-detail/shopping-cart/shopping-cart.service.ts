import { Injectable } from '@angular/core';
import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';
import { NotificationService } from 'app/shared/messages/notification.service';

@Injectable()     // todo serviço que vai receber algo precisa ser marcado com @Injectable()
export class ShoppingCartService {

  items: CartItem[] = []    // precisa inicializar senão o 'map' do método total não inicializar de 'undefined'

  constructor(private notificationService: NotificationService) { }

  clear() {
    this.items = []
  }


  addItem(item: MenuItem) {
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)

    if (foundItem) {
      // item encontrado adicionar +1 a quantidade desse item.
      //foundItem.quantity = foundItem.quantity + 1
      this.increaseQty(foundItem)
    } else {
      // não encontrou com o item de menu, adiciona ao array de itens.
      this.items.push(new CartItem(item))
    }

    this.notificationService.notify(`Você adicionou o item ${item.name}`)
  }


  removeItem(item: CartItem) {
    // remove um elemento do array
    this.items.splice(this.items.indexOf(item), 1)

    this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
  }


  total(): number {
    return this.items
    .map(item => item.value())                // pega o do método 'value' do CartItem que já faz quantidade * preço.
    .reduce((prev, value) => prev+value, 0)   // soma o valor anterior com o atual e totaliza e começa com valor zero.
  }


  increaseQty(item: CartItem) {
    item.quantity = item.quantity + 1
  }


  decreaseQty(item: CartItem) {
    item.quantity = item.quantity - 1

    if (item.quantity === 0) {
      this.removeItem(item)
    }
  }

}
