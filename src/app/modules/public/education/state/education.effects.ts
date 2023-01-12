/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { EducationService } from 'src/app/project/services/education.service';
import { StateService } from 'src/app/project/services/state.service';

import * as actions from './education.actions';

@Injectable()
export class EducationEffects {

  loadEducations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.loadEducations),
      mergeMap(() => {
        return this.educationService.getAll().pipe(
          map((data) => actions.loadEducationsSuccess({data})),
          catchError((error) => of(actions.loadEducationsFailure({error})))
        );
      })
    );
  });

  saveEducationSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Education').actions.saveValueSuccess),
      map(() => actions.loadEducations())
    );
  });

  deleteEducationSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Education').actions.deleteValueSuccess),
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
    private educationService: EducationService,
    private stateService: StateService
  ) {}
}
