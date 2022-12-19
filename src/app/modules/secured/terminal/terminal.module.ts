import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeComponentsModule } from 'src/app/prime-components.module';
import { TerminalService } from 'primeng/terminal';
import { UserTerminalService } from 'src/app/project/services/terminal.service';
import { OverlayTerminalComponent } from './components/overlay-terminal/overlay-terminal.component';

const routes: Routes = [
  {
    path: "",
    component: OverlayTerminalComponent
  }
];

@NgModule({
  declarations: [
    TerminalComponent,
    OverlayTerminalComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimeComponentsModule 
  ],
  providers: [
    TerminalService,
    UserTerminalService
  ]
})
export class TerminalModule { }
