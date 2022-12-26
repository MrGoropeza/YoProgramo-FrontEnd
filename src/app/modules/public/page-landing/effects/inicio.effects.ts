import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as InicioActions from '../actions/inicio.actions';
import * as FrontendActions from '../actions/frontend.actions';
import * as BackendActions from '../actions/backend.actions';
import * as AboutActions from '../actions/aboutme.actions';
import { TechnologiesService } from 'src/app/project/services/technologies.service';
import { AboutMeService } from 'src/app/project/services/about-me.service';

@Injectable()
export class InicioEffects {
  loadInicioFrontEnd$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadInicios),
      map(() => FrontendActions.loadFrontends())
    );
  });

  loadInicioBackEnd$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadInicios),
      map(() => BackendActions.loadBackends())
    );
  });

  loadInicioAboutMe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InicioActions.loadInicios),
      map(() => AboutActions.loadAboutmes())
    );
  });

  loadFrontendTechs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontendActions.loadFrontends),
      concatMap(() =>
        this.techService.getFrontendTechs().pipe(
          map((data) => FrontendActions.loadFrontendsSuccess({ data })),
          catchError((error) =>
            of(FrontendActions.loadFrontendsFailure({ error }))
          )
        )
      )
    );
  });

  loadBackendTechs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BackendActions.loadBackends),
      concatMap(() =>
        this.techService.getBackendTechs().pipe(
          map((data) => BackendActions.loadBackendsSuccess({ data })),
          catchError((error) =>
            of(BackendActions.loadBackendsFailure({ error }))
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
