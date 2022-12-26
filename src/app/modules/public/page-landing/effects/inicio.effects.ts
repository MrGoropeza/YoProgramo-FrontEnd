import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as InicioActions from '../actions/inicio.actions';


@Injectable()
export class InicioEffects {

  loadInicios$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(InicioActions.loadInicios),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => InicioActions.loadIniciosSuccess({ data })),
          catchError(error => of(InicioActions.loadIniciosFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
