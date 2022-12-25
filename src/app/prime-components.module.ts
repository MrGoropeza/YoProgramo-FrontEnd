import { NgModule } from '@angular/core';

import { TerminalModule } from 'primeng/terminal';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  exports: [
    TerminalModule,
    ButtonModule,
    OverlayPanelModule,
    DialogModule,
    TabMenuModule,
    InputSwitchModule,
  ],
})
export class PrimeComponentsModule {}
