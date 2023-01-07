import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { firstValueFrom, mergeMap, Observable } from 'rxjs';
import { Place } from 'src/app/project/models/place.model';
import { AboutService } from 'src/app/project/services/about.service';
import { PlaceService } from 'src/app/project/services/place.service';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { AboutCrudComponent } from '../about-crud.component';

@Injectable()
export class AboutEffects extends CrudEffects<appStateTypes> {
  state: CrudState<appStateTypes> = this.stateService.getState('About');

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private aboutService: AboutService,
    private placeService: PlaceService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'About',
      stateService.getState('About').actions,
      AboutCrudComponent,
      AboutCrudComponent,
      aboutService
    );
  }

  override deleteValue$!: never;
  override deleteValueFailure$!: never;
  override deleteValueSuccess$!: never;

  override openCrudDialog$!: never;

  override openCrudForm$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.state.actions.openCrudForm),
        mergeMap(async (action) => {
          let places = await firstValueFrom(this.placeService.getAll() as Observable<Place[]>)
          this.dialogService.open(AboutCrudComponent, {
            header: 'Editar Información Personal',
            data: { value: action.value, places },
          });
        })
      );
    },
    { dispatch: false }
  );

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
