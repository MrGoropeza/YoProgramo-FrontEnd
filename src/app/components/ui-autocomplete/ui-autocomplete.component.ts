import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ui-autocomplete',
  templateUrl: './ui-autocomplete.component.html',
  styleUrls: ['./ui-autocomplete.component.scss']
})
export class UiAutocompleteComponent implements OnInit {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() errorLabel!: string;

  @Input() suggestions!: any[];
  @Input() field!: string;
  @Output() search = new EventEmitter<string>();

  @Input() value!: number;
  @Output() valueChange = new EventEmitter<number>(); 

  @Input() control!: string
  @Input() group!: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
