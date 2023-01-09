/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ExperienceService } from 'src/app/project/services/experience.service';
import { StateService } from 'src/app/project/services/state.service';

import * as actions from './exp.actions';

@Injectable()
export class ExpEffects {

  loadExps$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.loadExps),
      mergeMap(() => {
        return this.expService.getAll().pipe(
          map((data) => actions.loadExpsSuccess({data})),
          catchError((error) => of(actions.loadExpsFailure({error})))
        );
      })
    );
  });

  saveExpSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Experience').actions.saveValueSuccess),
      map(() => actions.loadExps())
    );
  });

  deleteExpSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Experience').actions.deleteValueSuccess),
      map(() => actions.loadExps())
    );
  });

  savePlaceSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.saveValueSuccess),
      map(() => actions.loadExps())
    );
  });

  deletePlaceSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.deleteValueSuccess),
      map(() => actions.loadExps())
    );
  });

  constructor(
    private actions$: Actions,
    private expService: ExperienceService,
    private stateService: StateService
  ) {}
}
