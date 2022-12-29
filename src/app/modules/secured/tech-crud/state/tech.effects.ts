import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { loadTechsCrud, loadTechsCrudSuccess } from './tech.actions';



@Injectable()
export class TechEffects {

  constructor(private actions$: Actions) {}

  loadModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTechsCrud),
      map(() => loadTechsCrudSuccess())
    );
  });
}
