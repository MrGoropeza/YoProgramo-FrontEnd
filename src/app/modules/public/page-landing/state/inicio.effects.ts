/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as InicioActions from './inicio.actions';
import * as AboutActions from '../actions/aboutme.actions';
import { AboutMeService } from 'src/app/project/services/about-me.service';
import { TechService } from 'src/app/project/services/tech.service';
import { TechtypeService } from 'src/app/project/services/techtype.service';
import { StateService } from 'src/app/project/services/state.service';

@Injectable()
export class InicioEffects {
  loadInicioAboutMe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadInicios),
      map(() => AboutActions.loadAboutmes())
    );
  });

  loadInicioTechTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadInicios),
      map(() => InicioActions.loadTechsTypes())
    );
  });

  saveTechTypeSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('TechType').actions.saveValueSuccess),
      map(() => InicioActions.loadTechsTypes())
    );
  });

  deleteTechTypeSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('TechType').actions.deleteValueSuccess),
      map(() => InicioActions.loadTechsTypes())
    );
  });

  saveTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Tech').actions.saveValueSuccess),
      map(() => InicioActions.loadTechsTypes())
    );
  });

  deleteTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Tech').actions.deleteValueSuccess),
      map(() => InicioActions.loadTechsTypes())
    );
  });

  loadInicioTechs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadTechsTypesSuccess),
      concatMap((action) => {
        if (action.response.data.length === 0) {
          return of(InicioActions.loadTechsSuccess({ response: { data: [], totalRecords: 0 } }));
        }
        return this.techService
          .getWithQueryCustom(action.response.data[0].name, '')
          .pipe(
            map((data) => InicioActions.loadTechsSuccess({ response: { data, totalRecords: this.techService.totalRecords } })),
            catchError((error) => of(InicioActions.loadTechsFailure({ error })))
          );
      })
    );
  });

  loadTechsTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadTechsTypes),
      concatMap(() =>
        this.techTypeService.getAll().pipe(
          map((data) =>
            InicioActions.loadTechsTypesSuccess({
              response: { data, totalRecords: data.length },
            })
          ),
          catchError((error) => {
            console.log(error);

            return of(InicioActions.loadTechsTypesFailure({ error }));
          })
        )
      )
    );
  });

  loadTechs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadTechs),
      concatMap((action) =>
        this.techService.getWithQueryCustom(action.activeType, '').pipe(
          map((data) => InicioActions.loadTechsSuccess({ response: { data, totalRecords: this.techService.totalRecords } })),
          catchError((error) => of(InicioActions.loadTechsFailure({ error })))
        )
      )
    );
  });

  loadAboutMe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AboutActions.loadAboutmes),
      concatMap(() =>
        this.aboutService.getAboutMeInfo().pipe(
          map((data) => AboutActions.loadAboutmesSuccess({ data })),
          catchError((error) => of(AboutActions.loadAboutmesFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private techService: TechService,
    private techTypeService: TechtypeService,
    private aboutService: AboutMeService,
    private stateService: StateService
  ) {}
}
