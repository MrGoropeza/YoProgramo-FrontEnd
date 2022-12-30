import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ui-multiselect',
  templateUrl: './ui-multiselect.component.html',
  styleUrls: ['./ui-multiselect.component.scss']
})
export class UiMultiselectComponent implements OnInit {

  @Input() label!: string;
  @Input() errorLabel!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  
  @Input() options!: any;
  @Input() optionLabel!: string;
  @Input() optionValue!: string;

  @Input() control!: string
  @Input() group!: FormGroup

  @Output() panelHided = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
