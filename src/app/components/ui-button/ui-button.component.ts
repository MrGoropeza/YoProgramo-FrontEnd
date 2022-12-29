import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent implements OnInit {

  @Input() label!: string;
  @Input() icon!: string;
  @Input() class!: string;

  @Input() loading!: boolean;

  @Output() clickAction = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
