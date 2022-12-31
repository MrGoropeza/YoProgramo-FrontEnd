import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ui-button',
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss']
})
export class UiButtonComponent {

  @Input() label!: string;
  @Input() icon!: string;
  @Input() class!: string;

  @Input() loading!: boolean;
  @Input() disabled = false;

  @Output() clickAction = new EventEmitter();

}
