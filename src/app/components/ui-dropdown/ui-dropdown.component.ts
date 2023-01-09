import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudErrorMessage } from 'src/core/classes/ui-crud-error-message.model';

@Component({
  selector: 'app-ui-dropdown',
  templateUrl: './ui-dropdown.component.html'
})
export class UiDropdownComponent {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() customErrors!: CrudErrorMessage[];

  @Input() control!: string
  @Input() group!: FormGroup

  @Input() options!: any;
  @Input() optionLabel!: string;
  @Input() optionValue!: string;
  @Input() autoDisplayFirst = false;
  @Input() filter = false;

}
