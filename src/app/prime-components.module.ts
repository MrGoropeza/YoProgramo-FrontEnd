import { NgModule } from '@angular/core';

import { TerminalModule } from 'primeng/terminal';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  exports: [TerminalModule, ButtonModule, OverlayPanelModule, DialogModule],
})
export class PrimeComponentsModule {}
