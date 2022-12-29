import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { TechnologiesService } from 'src/app/project/services/technologies.service';
import * as TechTypeActions from './techs-type.actions';



@Injectable()
export class TechTypeEffects {


  constructor(
    private actions$: Actions,
    private techService: TechnologiesService
  ) {}

  loadTechTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TechTypeActions.loadTechsTypes),
      concatMap(() =>
        this.techService.getTechTypes().pipe(
          map((data) => TechTypeActions.loadTechsTypesSuccess({ data })),
          catchError((error) =>
            of(TechTypeActions.loadTechsTypesFailure({ error }))
          )
        )
      )
    );
  });
}
