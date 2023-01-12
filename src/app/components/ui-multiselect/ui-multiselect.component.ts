import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudErrorMessage } from 'src/core/classes/ui-crud-error-message.model';

@Component({
  selector: 'app-ui-multiselect',
  templateUrl: './ui-multiselect.component.html',
  styleUrls: ['./ui-multiselect.component.scss']
})
export class UiMultiselectComponent {

  @Input() label!: string;
  @Input() customErrors!: CrudErrorMessage[];
  @Input() placeholder!: string;
  @Input() icon!: string;

  @Input() maxSelectedLabels = 3;
  @Input() selectedItemsLabel!: string;
  @Input() options!: any;
  @Input() optionLabel!: string;
  @Input() optionValue!: string;
  @Input() withGrouping = false;
  @Input() optionGroupLabel!: string;
  @Input() optionGroupChildren!: string;
  @Input() filterBy!: string;
  @Input() filterValue!: string;

  @Input() control!: string
  @Input() group!: FormGroup

  @Output() panelHided = new EventEmitter();

}
