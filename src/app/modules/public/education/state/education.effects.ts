/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ExperienceService } from 'src/app/project/services/experience.service';
import { StateService } from 'src/app/project/services/state.service';

import * as actions from './education.actions';

@Injectable()
export class EducationEffects {

  loadEducation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.loadEducations),
      mergeMap(() => {
        return this.expService.getAll().pipe(
          map((data) => actions.loadEducationsSuccess({data: data as any})),
          catchError((error) => of(actions.loadEducationsFailure({error})))
        );
      })
    );
  });

  saveExpSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Experience').actions.saveValueSuccess),
      map(() => actions.loadEducations())
    );
  });

  deleteExpSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Experience').actions.deleteValueSuccess),
      map(() => actions.loadEducations())
    );
  });

  savePlaceSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.saveValueSuccess),
      map(() => actions.loadEducations())
    );
  });

  deletePlaceSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.deleteValueSuccess),
      map(() => actions.loadEducations())
    );
  });

  constructor(
    private actions$: Actions,
    private expService: ExperienceService,
    private stateService: StateService
  ) {}
}
