import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TerminalComponent } from './terminal.component';
import { PrimeComponentsModule } from 'src/app/prime-components.module';
import { StoreModule } from '@ngrx/store';
import * as fromTerminal from './state/terminal.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TerminalEffects } from './state/terminal.effects';
import { TerminalService } from 'primeng/terminal';
import { UserTerminalService } from 'src/app/project/services/terminal.service';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [TerminalComponent],
  imports: [
    CommonModule,
    PrimeComponentsModule,
    StoreModule.forFeature(
      fromTerminal.terminalFeatureKey,
      fromTerminal.reducer
    ),
    EffectsModule.forFeature([TerminalEffects]),
  ],
  providers: [TerminalService, UserTerminalService, DialogService],
})
export class TerminalModule {}
