import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudErrorMessage } from 'src/core/classes/ui-crud-error-message.model';

@Component({
  selector: 'app-ui-knob',
  templateUrl: './ui-knob.component.html',
  styleUrls: ['./ui-knob.component.scss']
})
export class UiKnobComponent {

  @Input() label!: string;
  @Input() customErrors!: CrudErrorMessage[];

  @Input() control!: string
  @Input() group!: FormGroup

  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  @Input() readonly = false;
  @Input() min = 0;
  @Input() max = 100;

  @Input() valueColor!: string;
  @Input() rangeColor!: string;
  @Input() textColor!: string;

}
