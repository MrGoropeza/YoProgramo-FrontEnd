/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as InicioActions from './inicio.actions';
import { StateService } from 'src/app/project/services/state.service';
import { AboutService } from 'src/app/project/services/about.service';

@Injectable()
export class InicioEffects {
  loadAboutMe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadAboutmes),
      concatMap(() =>
        this.aboutService.getMyInfo().pipe(
          map((data) => InicioActions.loadAboutmesSuccess({ data })),
          catchError((error) =>
            of(InicioActions.loadAboutmesFailure({ error }))
          )
        )
      )
    );
  });

  saveAboutSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('About').actions.saveValueSuccess),
      map(() => InicioActions.loadAboutmes())
    );
  });

  savePlaceSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.saveValueSuccess),
      map(() => InicioActions.loadAboutmes())
    );
  });

  saveExpSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Experience').actions.saveValueSuccess),
      map(() => InicioActions.loadAboutmes())
    );
  });

  deleteExpSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        this.stateService.getState('Experience').actions.deleteValueSuccess
      ),
      map(() => InicioActions.loadAboutmes())
    );
  });

  saveEducationSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Education').actions.saveValueSuccess),
      map(() => InicioActions.loadAboutmes())
    );
  });

  deleteEducationSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        this.stateService.getState('Education').actions.deleteValueSuccess
      ),
      map(() => InicioActions.loadAboutmes())
    );
  });

  constructor(
    private actions$: Actions,
    private aboutService: AboutService,
    private stateService: StateService
  ) {}
}
