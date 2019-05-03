import { Injectable } from '@angular/core'
import { Restaurant } from './restaurant/restaurant.model'

import { MEAT_API }   from '../app.api'

import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ErrorHandler } from 'app/app.error-handler';
import { MenuItem } from 'app/restaurant-detail/menu-item/menu-item.model';

@Injectable()
export class RestaurantsService {
  constructor(private http: Http) { }

  // metodo que retornara a lista de restaurantes
  // tem que subir o backend mocado com: json-server db.json

  restaurants(search?: string): Observable<Restaurant[]> {
    return this.http.get(`${MEAT_API}/restaurants`, {params: {q: search}})    // parametro generico 'q' indica ao jsonserver a busca de todos que contem
    .map(response => response.json())
    .catch(ErrorHandler.handleError)
  }


  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get(`${MEAT_API}/restaurants/${id}`)
    .map(r => r.json())
    .catch(ErrorHandler.handleError)
  }


  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    .map(r => r.json())
    .catch(ErrorHandler.handleError)
  }


  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
    .map(r => r.json())
    .catch(ErrorHandler.handleError)
  }

}
