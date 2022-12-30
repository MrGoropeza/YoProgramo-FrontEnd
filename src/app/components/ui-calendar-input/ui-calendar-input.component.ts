import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudErrorMessage } from 'src/core/classes/ui-crud-error-message.model';

@Component({
  selector: 'app-ui-calendar-input',
  templateUrl: './ui-calendar-input.component.html',
  styleUrls: ['./ui-calendar-input.component.scss']
})
export class UiCalendarInputComponent {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() customErrors!: CrudErrorMessage[];

  @Input() suggestions!: any[];
  @Input() field!: string;
  @Output() search = new EventEmitter<string>();

  @Input() value!: number;
  @Output() valueChange = new EventEmitter<number>(); 

  @Input() control!: string
  @Input() group!: FormGroup

}
