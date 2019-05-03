import { Component, OnInit, Input } from '@angular/core';

import { Restaurant } from './restaurant.model'
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  animations: [
    trigger('restaurantApperead', [
      state('ready', style({opacity: 1})),                            // representa o estado visivel do componente.
      transition('void => ready', [                                   // void representa que a animação está fora.
        style({opacity: 0, transform: 'translate(-30px, -10px)'}),    // eixo X e Y, sai de invisivel a -30X e vai a -10Y
        animate('500ms 0s ease-in-out')                               // ease-in-out: entra acelerando e sai desacelerando
      ])     
    ])
  ]
})
export class RestaurantComponent implements OnInit {

  restaurantState = 'ready'

  @Input() restaurant: Restaurant

  constructor() { }

  ngOnInit() {
  }

}
