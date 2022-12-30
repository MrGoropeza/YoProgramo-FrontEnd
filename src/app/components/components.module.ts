import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from '../prime-components.module';
import { OverlayTerminalComponent } from './overlay-terminal/overlay-terminal.component';
import { TerminalService } from 'primeng/terminal';
import { UserTerminalService } from '../project/services/terminal.service';
import { ButtonDarkmodeComponent } from './button-darkmode/button-darkmode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiDynamicTableComponent } from './ui-dynamic-table/ui-dynamic-table.component';
import { UiButtonComponent } from './ui-button/ui-button.component';
import { ListPipe } from 'src/core/pipes/list.pipe';
import { ObjectPipe } from 'src/core/pipes/object.pipe';
import { NullablePipe } from 'src/core/pipes/nullable.pipe';
import { UiAutocompleteComponent } from './ui-autocomplete/ui-autocomplete.component';
import { UiCalendarInputComponent } from './ui-calendar-input/ui-calendar-input.component';
import { UiDropdownComponent } from './ui-dropdown/ui-dropdown.component';
import { UiInputNumberComponent } from './ui-input-number/ui-input-number.component';
import { UiInputTextComponent } from './ui-input-text/ui-input-text.component';
import { UiMultiselectComponent } from './ui-multiselect/ui-multiselect.component';
import { UiTextareaComponent } from './ui-textarea/ui-textarea.component';
import { CrudErrorMessagePipe } from 'src/core/pipes/crud-error-message.pipe';



@NgModule({
  declarations: [
    OverlayTerminalComponent,
    ButtonDarkmodeComponent,
    UiDynamicTableComponent,
    UiButtonComponent,
    UiAutocompleteComponent,
    UiCalendarInputComponent,
    UiDropdownComponent,
    UiInputNumberComponent,
    UiInputTextComponent,
    UiMultiselectComponent,
    UiTextareaComponent,
    ListPipe,
    ObjectPipe,
    NullablePipe,
    CrudErrorMessagePipe,
  ],
  exports: [
    OverlayTerminalComponent,
    PrimeComponentsModule,
    ButtonDarkmodeComponent,
    UiDynamicTableComponent,
    UiButtonComponent,
    UiAutocompleteComponent,
    UiCalendarInputComponent,
    UiDropdownComponent,
    UiInputNumberComponent,
    UiInputTextComponent,
    UiMultiselectComponent,
    UiTextareaComponent,
    ListPipe,
    ObjectPipe,
    NullablePipe,
    CrudErrorMessagePipe,
  ],
  imports: [
    CommonModule,
    PrimeComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TerminalService,
    UserTerminalService
  ],
})
export class ComponentsModule { }
