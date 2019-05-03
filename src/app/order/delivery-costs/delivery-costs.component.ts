import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-delivery-costs',
  templateUrl: './delivery-costs.component.html'
})
export class DeliveryCostsComponent implements OnInit {

  @Input() itemsValue: number
  @Input() delivery: number

  constructor() { }

  ngOnInit() {
  }

  total(): number {
    return this.itemsValue + this.delivery
  }
}
