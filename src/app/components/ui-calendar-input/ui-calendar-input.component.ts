import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudErrorMessage } from 'src/core/classes/ui-crud-error-message.model';

export type DateSelectionMode = "single" | "multiple" | "range";

@Component({
  selector: 'app-ui-calendar-input',
  templateUrl: './ui-calendar-input.component.html'
})
export class UiCalendarInputComponent {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() customErrors!: CrudErrorMessage[];

  @Input() selectionMode: DateSelectionMode = "single";

  @Input() control!: string
  @Input() group!: FormGroup

}
