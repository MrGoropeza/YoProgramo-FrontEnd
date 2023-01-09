import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudErrorMessage } from 'src/core/classes/ui-crud-error-message.model';

@Component({
  selector: 'app-ui-textarea',
  templateUrl: './ui-textarea.component.html'
})
export class UiTextareaComponent {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() customErrors!: CrudErrorMessage[];

  @Input() control!: string
  @Input() group!: FormGroup

  @Input() rows!: number;
  @Input() cols!: number;
  @Input() autoResize!: boolean;

}
