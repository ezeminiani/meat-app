import { Component, OnInit, Input, forwardRef } from '@angular/core';
import {RadioOption} from './radio-option.model'
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  // é estranho tá fazendo mas a intenção é registrar o ValueAccessor e permitir que o Form visualize esse componente.
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]

  value: any

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any) {
    this.value = value
    this.onChange(this.value)
  }

  // metodos abaixo da interface ControlValueAccessor

  // chamado pela diretira quando deseja passar um valor
  writeValue(obj: any): void {
    this.value = obj
  }
  
  // chamado quando receber um evento de alteração
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
    
  // se o usuário entrou no seu componente
  registerOnTouched(fn: any): void {
  }
  
  setDisabledState?(isDisabled: boolean): void {
  }


}
