import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  delivery: number = 8    // valor fixo mas o frete deverá vir do backend

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(private orderService: OrderService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    // Criando o formulario com ReactForms
    // O formulário anterior nom ngModel é compatível com AngularJS (Template Forms)
    
    this.orderForm = this.formBuilder.group({
      //name: '',                                 // forma reduzida de criar o controle
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required]),
    }, 
      {validator: OrderComponent.equalsTo})    // validador personalizado
  }

  // Funcao estatica que recebe o grupo de controles e atraves da referencia com o nome do campo 'formControlName'
  // consigo validar o conteudo. Retorna um par chave:valor
  static equalsTo(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')

    if(!email || !emailConfirmation) {
      return undefined
    }

    if(email.value !== emailConfirmation.value) {
      return {emailIsNotMatch:true}     // chave eu crio do jeito que quiser e utilizo no template.
    }

    // se os valores nao batem retorna a chave e se bater retorna undefined
    return undefined    
  }


  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  // expoe os itens 
  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }


  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }


  checkOrder(order: Order) {

    // pegando um array de CartItem e transformando em array de OrderItem
    order.orderItems = this.cartItems()
    .map((item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    // somente no subscribe que executa a consulta
    this.orderService.checkOrder(order)
      .subscribe( (orderId: string) => {
        this.router.navigate(['/order-summary'])
        
        console.log(`Compra concluida ${orderId}`)

        this.orderService.clear()
    })

    console.log(order)
  }
}
