import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ui-calendar-input',
  templateUrl: './ui-calendar-input.component.html',
  styleUrls: ['./ui-calendar-input.component.scss']
})
export class UiCalendarInputComponent implements OnInit {

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
