/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as InicioActions from './inicio.actions';
import { TechService } from 'src/app/project/services/tech.service';
import { TechtypeService } from 'src/app/project/services/techtype.service';
import { StateService } from 'src/app/project/services/state.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AboutService } from 'src/app/project/services/about.service';

@Injectable()
export class InicioEffects {
  loadInicioAboutMe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadInicios),
      map(() => InicioActions.loadAboutmes())
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

  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private techService: TechService,
    private techTypeService: TechtypeService,
    private aboutService: AboutService,
    private stateService: StateService
  ) {}
}
