import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from '../prime-components.module';
import { OverlayTerminalComponent } from './overlay-terminal/overlay-terminal.component';
import { TerminalService } from 'primeng/terminal';
import { UserTerminalService } from '../project/services/terminal.service';
import { ButtonDarkmodeComponent } from './button-darkmode/button-darkmode.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OverlayTerminalComponent,
    ButtonDarkmodeComponent,
  ],
  exports: [
    OverlayTerminalComponent,
    PrimeComponentsModule,
    ButtonDarkmodeComponent,
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
