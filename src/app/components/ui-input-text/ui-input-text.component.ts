import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudErrorMessage } from 'src/core/classes/ui-crud-error-message.model';


@Component({
  selector: 'app-ui-input-text',
  templateUrl: './ui-input-text.component.html',
  styleUrls: ['./ui-input-text.component.scss']
})
export class UiInputTextComponent {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() customErrors!: CrudErrorMessage[];

  @Input() control!: string
  @Input() group!: FormGroup

}
