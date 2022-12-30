import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as InicioActions from './inicio.actions';
import * as AboutActions from '../actions/aboutme.actions';
import { TechnologiesService } from 'src/app/project/services/technologies.service';
import { AboutMeService } from 'src/app/project/services/about-me.service';

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

  loadInicioTechs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadTechsTypesSuccess),
      concatMap((action) => {
        if(action.response.data.length === 0){
          return of(InicioActions.loadTechsSuccess({ data: [] }));
        }
        return this.techService.getTechs(action.response.data[0].name).pipe(
          map((data) => InicioActions.loadTechsSuccess({ data })),
          catchError((error) =>
            of(InicioActions.loadTechsFailure({ error }))
          )
        )
      }
      )
    );
  });

  loadTechsTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadTechsTypes),
      concatMap(() =>
        this.techService.getTechTypes().pipe(
          map((data) => InicioActions.loadTechsTypesSuccess({ response: data })),
          catchError((error) =>
            of(InicioActions.loadTechsTypesFailure({ error }))
          )
        )
      )
    );
  });

  loadTechs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadTechs),
      concatMap((action) =>
        this.techService.getTechs(action.activeType).pipe(
          map((data) => InicioActions.loadTechsSuccess({ data })),
          catchError((error) =>
            of(InicioActions.loadTechsFailure({ error }))
          )
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
    private techService: TechnologiesService,
    private aboutService: AboutMeService
  ) {}
}
