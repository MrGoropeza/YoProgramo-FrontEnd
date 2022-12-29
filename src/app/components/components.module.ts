import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from '../prime-components.module';
import { OverlayTerminalComponent } from './overlay-terminal/overlay-terminal.component';
import { TerminalService } from 'primeng/terminal';
import { UserTerminalService } from '../project/services/terminal.service';
import { ButtonDarkmodeComponent } from './button-darkmode/button-darkmode.component';
import { FormsModule } from '@angular/forms';
import { UiDynamicTableComponent } from './ui-dynamic-table/ui-dynamic-table.component';
import { UiButtonComponent } from './ui-button/ui-button.component';
import { ListPipe } from 'src/core/pipes/list.pipe';
import { ObjectPipe } from 'src/core/pipes/object.pipe';
import { NullablePipe } from 'src/core/pipes/nullable.pipe';



@NgModule({
  declarations: [
    OverlayTerminalComponent,
    ButtonDarkmodeComponent,
    UiDynamicTableComponent,
    UiButtonComponent,
    ListPipe,
    ObjectPipe,
    NullablePipe,
  ],
  exports: [
    OverlayTerminalComponent,
    PrimeComponentsModule,
    ButtonDarkmodeComponent,
    UiDynamicTableComponent,
    UiButtonComponent,
    ListPipe,
    ObjectPipe,
    NullablePipe,
  ],
  imports: [
    CommonModule,
    PrimeComponentsModule,
    FormsModule
  ],
  providers: [
    TerminalService,
    UserTerminalService
  ],
})
export class ComponentsModule { }
