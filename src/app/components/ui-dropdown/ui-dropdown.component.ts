import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ui-dropdown',
  templateUrl: './ui-dropdown.component.html',
  styleUrls: ['./ui-dropdown.component.scss']
})
export class UiDropdownComponent implements OnInit {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() errorLabel!: string;

  @Input() control!: string
  @Input() group!: FormGroup

  @Input() options!: any;
  @Input() optionLabel!: string;
  @Input() optionValue!: string;
  @Input() autoDisplayFirst!: boolean;
  

  constructor() { }

  ngOnInit(): void {
  }

}
