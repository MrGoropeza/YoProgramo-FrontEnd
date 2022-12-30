import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudErrorMessage } from 'src/core/classes/ui-crud-error-message.model';

@Component({
  selector: 'app-ui-autocomplete',
  templateUrl: './ui-autocomplete.component.html',
  styleUrls: ['./ui-autocomplete.component.scss']
})
export class UiAutocompleteComponent {

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
