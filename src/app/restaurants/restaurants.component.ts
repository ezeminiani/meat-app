import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toogleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height": "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height": "70px",
        "margin-top": "20px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'
  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(private restaurantsService: RestaurantsService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('')

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    // para ouvir o que digita no campo:
    //this.searchControl.valueChanges.subscribe(searchTerm => console.log(searchTerm))
    
    // 
    this.searchControl.valueChanges.switchMap(s => this.restaurantsService.restaurants(s))
    .subscribe(r => this.restaurants = r)


    this.restaurantsService.restaurants()
      .subscribe(r => this.restaurants = r)   // subscribe se inscreve e emite os valores que estão no Observable
  }

  toggleSearch() {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }


  /*
  utilizar no html do componente para chamar esse metodo:
  {{ alerta("Restaurantes localizados.") }}

  // metodo que exibe um alerta no templante.
  alerta(msg: string){
    //console.log(msg)
    alert(msg)
  }
  */
}
