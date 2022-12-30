import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-ui-input-text',
  templateUrl: './ui-input-text.component.html',
  styleUrls: ['./ui-input-text.component.scss']
})
export class UiInputTextComponent implements OnInit {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() errorLabel!: string;

  @Input() control!: string
  @Input() group!: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
