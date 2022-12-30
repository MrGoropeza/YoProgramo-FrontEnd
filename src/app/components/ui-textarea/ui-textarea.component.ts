import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ui-textarea',
  templateUrl: './ui-textarea.component.html',
  styleUrls: ['./ui-textarea.component.scss']
})
export class UiTextareaComponent implements OnInit {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() errorLabel!: string;

  @Input() control!: string
  @Input() group!: FormGroup

  @Input() rows!: number;
  @Input() cols!: number;
  @Input() autoResize!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
