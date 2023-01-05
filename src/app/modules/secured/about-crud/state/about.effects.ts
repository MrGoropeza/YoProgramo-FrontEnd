import { Injectable } from '@angular/core';
import { Actions, createEffect, CreateEffectMetadata, ofType } from '@ngrx/effects';
import { TypedAction } from '@ngrx/store/src/models';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { map, Observable } from 'rxjs';
import { MultipleRecordsResponse } from 'src/app/project/models/MultipleRecordsResponse';
import { AboutService } from 'src/app/project/services/about.service';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { AboutCrudComponent } from '../about-crud.component';



@Injectable()
export class AboutEffects extends CrudEffects<appStateTypes>{

  state: CrudState<appStateTypes> = this.stateService.getState("About");

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private aboutService: AboutService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      "About",
      stateService.getState("About").actions,
      AboutCrudComponent,
      AboutCrudComponent,
      aboutService
    );
  }

  override deleteValue$!: never;
  override deleteValueFailure$!: never;
  override deleteValueSuccess$!: never;

  override openCrudDialog$!: never;

  // override openCrudForm$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(this.state.actions.openCrudForm),
  //     map(() => this.loadValues$())
  //   );
  // });

  // override loadValues$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(this.state.actions.loadValues),
  //     map()
  //   );
  // });
}
