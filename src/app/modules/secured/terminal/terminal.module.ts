import { NgModule } from '@angular/core';
import { TerminalComponent } from './terminal.component';
import { PrimeComponentsModule } from 'src/app/prime-components.module';
import { TerminalService } from 'primeng/terminal';
import { UserTerminalService } from 'src/app/project/services/terminal.service';
import { OverlayTerminalComponent } from './components/overlay-terminal/overlay-terminal.component';

@NgModule({
  declarations: [
    TerminalComponent,
    OverlayTerminalComponent
  ],
  imports: [
    PrimeComponentsModule 
  ],
  providers: [
    TerminalService,
    UserTerminalService
  ],
  exports: [
    OverlayTerminalComponent,
  ]
})
export class TerminalModule { }
