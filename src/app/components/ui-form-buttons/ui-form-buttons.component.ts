import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ui-form-buttons',
  templateUrl: './ui-form-buttons.component.html'
})
export class UiFormButtonsComponent {

  @Input() cargando = false;
  @Input() invalid = false;
  @Output() cancelarClick = new EventEmitter();
  @Output() guardarClick = new EventEmitter();

}
