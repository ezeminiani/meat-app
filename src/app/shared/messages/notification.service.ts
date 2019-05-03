import { EventEmitter } from '@angular/core';

export class NotificationService {

  notifier = new EventEmitter<any>()

  constructor() { }

  // Será emitida a mensagem para quem injetar esse serviço.
  notify(message: string) {
    this.notifier.emit(message)
  }

}
