import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeComponentsModule } from '../prime-components.module';
import { OverlayTerminalComponent } from './overlay-terminal/overlay-terminal.component';
import { TerminalService } from 'primeng/terminal';
import { UserTerminalService } from '../project/services/terminal.service';



@NgModule({
  declarations: [
    OverlayTerminalComponent
  ],
  exports: [
    OverlayTerminalComponent,
    PrimeComponentsModule
  ],
  imports: [
    CommonModule,
    PrimeComponentsModule
  ],
  providers: [
    TerminalService,
    UserTerminalService
  ],
})
export class ComponentsModule { }
