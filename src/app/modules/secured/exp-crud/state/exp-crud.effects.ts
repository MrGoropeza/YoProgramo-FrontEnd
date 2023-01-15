/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, firstValueFrom, map, mergeMap, of } from 'rxjs';
import { Experience } from 'src/app/project/models/Experience.model';
import { ExperienceService } from 'src/app/project/services/experience.service';
import { PlaceService } from 'src/app/project/services/place.service';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { ExpCrudComponent } from '../exp-crud.component';
import { ExpFormComponent } from '../exp-form/exp-form.component';

@Injectable()
export class ExpCrudEffects extends CrudEffects<appStateTypes> {
  state: CrudState<appStateTypes> = this.stateService.getState('Experience');

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private expService: ExperienceService,
    private placeService: PlaceService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'Experience',
      stateService.getState('Experience').actions,
      ExpCrudComponent,
      ExpFormComponent,
      expService
    );
  }

  override loadCrudFormData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.loadCrudFormData),
      mergeMap(async () => {
        const places = await firstValueFrom(this.placeService.getAll());
        const data = { places };
        return this.state.actions.loadCrudFormDataSuccess({ data });
      }),
      catchError((error) =>
        of(this.state.actions.loadCrudFormDataFailure({ error }))
      )
    );
  });

  // Place effects
  savePlaceSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.saveValueSuccess),
      map(() => this.state.actions.loadCrudFormData())
    );
  });

  deletePlaceSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.deleteValueSuccess),
      map(() => this.state.actions.loadCrudFormData())
    );
  });

  override openCrudForm$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.state.actions.openCrudForm),
        mergeMap(async (action) => {
          this.dialogService.open(ExpFormComponent, {
            header: action.value
              ? `Editar ${this.state.modelName} "${
                  (action.value as Experience).place.name
                }"`
              : `Agregar ${this.state.modelName}`,
            data: { value: action.value },
          });
        })
      );
    },
    { dispatch: false }
  );
}
