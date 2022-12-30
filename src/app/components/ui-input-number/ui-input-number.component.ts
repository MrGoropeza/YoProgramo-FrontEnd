import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ui-input-number',
  templateUrl: './ui-input-number.component.html',
  styleUrls: ['./ui-input-number.component.scss']
})
export class UiInputNumberComponent implements OnInit {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() errorLabel!: string;
  @Input() showButtons!: boolean;
  @Input() mode!: string;
  @Input() min!: number;
  @Input() max!: number;
  @Input() suffix!: string;
  @Input() minFractionDigits!: number;
  @Input() maxFractionDigits!: number;
  @Input() step!: number;
  @Input() useGrouping!: boolean;

  @Input() value!: number;
  @Output() valueChange = new EventEmitter<number>(); 

  @Input() control!: string
  @Input() group!: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
