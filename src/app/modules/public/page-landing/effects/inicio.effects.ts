import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as InicioActions from '../actions/inicio.actions';
import * as FrontendActions from '../actions/frontend.actions';
import * as BackendActions from '../actions/backend.actions';
import { TechnologiesService } from 'src/app/project/services/technologies.service';

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

  loadFrontendTechs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FrontendActions.loadFrontends),
      concatMap(() =>
        this.techService.getFrontendTechs().pipe(
          map((frontendTechs) =>
            FrontendActions.loadFrontendsSuccess({ data: frontendTechs })
          ),
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
          map((frontendTechs) =>
            BackendActions.loadBackendsSuccess({ data: frontendTechs })
          ),
          catchError((error) =>
            of(BackendActions.loadBackendsFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private techService: TechnologiesService
  ) {}
}
