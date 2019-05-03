import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any    // objeto de referencia para o campo input
  @Input() label: string    // será passado pelo componente pai
  @Input() errorMessage: string   // idem

  // parametro do ContentChild (NgModel) veio do ngModel que está associado ao campo input.
  @ContentChild(NgModel) model: NgModel
  @ContentChild(FormControlName) control: FormControlName   // para deixar compatível com React Forms

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    // vai ser chamado quando o conteudo de ng-content for solicitado.
    this.input = this.model || this.control     // procura tanto ngModel ou formControlName, vai usar uma das duas.
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser utilizado com uma diretiva ngModel ou formControlName.')
    }
  }

    hasSuccess(): boolean {
      return this.input.valid && (this.input.dirty || this.input.touched)
    }

    hasError(): boolean {
      return this.input.invalid && (this.input.dirty || this.input.touched)
    }
}
