import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudErrorMessage } from 'src/core/classes/ui-crud-error-message.model';

@Component({
  selector: 'app-ui-input-number',
  templateUrl: './ui-input-number.component.html',
  styleUrls: ['./ui-input-number.component.scss']
})
export class UiInputNumberComponent {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() customErrors!: CrudErrorMessage[];
  @Input() showButtons!: boolean;
  @Input() mode!: string;
  @Input() min!: number;
  @Input() max!: number;
  @Input() suffix!: string;
  @Input() minFractionDigits!: number;
  @Input() maxFractionDigits!: number;
  @Input() step!: number;
  @Input() useGrouping!: boolean;

  @Input() value!: number;
  @Output() valueChange = new EventEmitter<number>(); 

  @Input() control!: string
  @Input() group!: FormGroup

}
