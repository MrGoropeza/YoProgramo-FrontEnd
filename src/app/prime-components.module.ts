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
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MultiSelectModule} from 'primeng/multiselect';

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
    InputTextModule, 
    AutoCompleteModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    MultiSelectModule,
  ],
})
export class PrimeComponentsModule {}
