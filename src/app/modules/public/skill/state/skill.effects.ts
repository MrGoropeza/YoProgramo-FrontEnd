/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { SkillService } from 'src/app/project/services/skill.service';
import { StateService } from 'src/app/project/services/state.service';

import * as actions from './skill.actions';

@Injectable()
export class SkillEffects {

  loadSkills$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.loadSkills),
      mergeMap(() => {
        return this.skillService.getAll().pipe(
          map((data) => actions.loadSkillsSuccess({data})),
          catchError((error) => of(actions.loadSkillsFailure({error})))
        );
      })
    );
  });

  saveSkillSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Education').actions.saveValueSuccess),
      map(() => actions.loadSkills())
    );
  });

  deleteSkillSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Education').actions.deleteValueSuccess),
      map(() => actions.loadSkills())
    );
  });

  constructor(
    private actions$: Actions,
    private skillService: SkillService,
    private stateService: StateService
  ) {}
}
