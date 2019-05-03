import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from '../notification.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [     // é o nome dado a trigger
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),   // ease-in vai entrar acelerando.
      transition('visible => hidden', animate('500ms 0s ease-out'))   // ease-out vai sair desacelerando.
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string

  snackvisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {

    /* quem se inscreve recebe a mensagem. Desse jeito tem um problema
    que não existe sincronização do Observable com o timer.

    this.notificationService.notifier.subscribe(message => {
         this.message = message
         this.snackvisibility = 'visible'
         Observable.timer(3000).subscribe(timer => this.snackvisibility = 'hidden')   // conta o tempo para desaparecer

    })
    */

    // o operador 'do' permite executar uma ação no instante que chega a mensagem
    // tive que mudar o retorno do eventemitter para any do notification.service porque o operador 'do'
    // não aceita aceita tipar para string nessa situação.
    // https://pt.stackoverflow.com/questions/340958/contexto-this-do-eventemitterstring-não-é-atribuível-ao-método-this-do-tip

    // vou executar a ação (operador do) e exibir a mensagem, trocar por um timer e assim que acabar o tempo
    // fazer o subscribe para mudar a visibilidade.

    this.notificationService.notifier
    .do((msg: string) => {
      this.message = msg
      this.snackvisibility = 'visible'
    }).switchMap(message => Observable.timer(3000))
      .subscribe(timer => this.snackvisibility = 'hidden')


  }


  /*
  usou um botão de teste, direto no template do componente.
  toggleSnack() {
    this.snackvisibility = this.snackvisibility === 'hidden' ? 'visible' : 'hidden'
  }
  */
}
