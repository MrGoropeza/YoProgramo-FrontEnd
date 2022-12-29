import { NgModule } from '@angular/core';

import { TerminalModule } from 'primeng/terminal';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {InputTextModule} from 'primeng/inputtext';

@NgModule({
  exports: [
    TerminalModule,
    ButtonModule,
    OverlayPanelModule,
    DialogModule,
    TabMenuModule,
    InputSwitchModule,
    TooltipModule,
    SkeletonModule,
    DynamicDialogModule,
    TableModule,
    ConfirmDialogModule,
    InputTextModule
  ],
})
export class PrimeComponentsModule {}
