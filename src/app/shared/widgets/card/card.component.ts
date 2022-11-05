import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() school: string ="";
  @Input() count: number =0;
  @Input() female: number =0;
  @Input() male: number =0;
  @Input() logo: string ="";

  constructor() { }

  ngOnInit(): void {
  }

}
