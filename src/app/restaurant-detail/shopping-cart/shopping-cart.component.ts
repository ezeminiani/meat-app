import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { MenuItem } from '../menu-item/menu-item.model';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  animations: [
    trigger('row',[  
      state('ready', style({opacity: 1})),
      transition('void => ready', animate('300ms 0s ease-in', keyframes([     // entrada do item no shopping-cart
        style({opacity: 0, transform: 'translateX(-30px)', offset:0}),         // totalmente invisivel
        style({opacity: 0.8, transform: 'translateX(10px)', offset:0.8}),      // quase visivel aos 80% e passa 10px a frente
        style({opacity: 1, transform: 'translateX(0px)', offset:1})            // totalmente visivel
      ]))),
      transition('ready => void', animate('300ms 0s ease-out', keyframes([     // saida do item no shopping-cart
        style({opacity: 1, transform: 'translateX(0px)', offset:1}),            // totalmente visivel
        style({opacity: 0.8, transform: 'translateX(-10px)', offset:0.2}),      // ainda visivel aos 20% e volta -10px para sair
        style({opacity: 0, transform: 'translateX(30px)', offset:0})            // totalmente invisivel
      ])))
    ])
  ]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready'

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }


  // metodo para expor os itens:
  items(): any[] {
    return this.shoppingCartService.items
  }


  // metodo para expor o total:
  total(): number {
    return this.shoppingCartService.total()
  }


  clear() {
    this.shoppingCartService.clear()
  }


  removeItem(item: any) {
    this.shoppingCartService.removeItem(item)
  }


  // esse metodo vai ser chamado de menu.component
  addItem(item: any) {
    this.shoppingCartService.addItem(item)
  }

}
