import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimeComponentsModule } from 'src/app/prime-components.module';
import { TerminalService } from 'primeng/terminal';
import { UserTerminalService } from 'src/app/project/services/terminal.service';

const routes: Routes = [
  {
    path: "",
    component: TerminalComponent
  }
];

@NgModule({
  declarations: [
    TerminalComponent
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
