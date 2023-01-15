/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { ProjectService } from 'src/app/project/services/project.service';
import { StateService } from 'src/app/project/services/state.service';

import * as actions from './project.actions';

@Injectable()
export class ProjectEffects {

  loadProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.loadProjects),
      mergeMap(() => {
        return this.projectService.getAll().pipe(
          map((data) => actions.loadProjectsSuccess({data})),
          catchError((error) => of(actions.loadProjectsFailure({error})))
        );
      })
    );
  });

  // Project effects
  saveProjectSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Project').actions.saveValueSuccess),
      map(() => actions.loadProjects())
    );
  });

  deleteProjectSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Project').actions.deleteValueSuccess),
      map(() => actions.loadProjects())
    );
  });

  // Place effects
  savePlaceSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.saveValueSuccess),
      map(() => actions.loadProjects())
    );
  });

  deletePlaceSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.deleteValueSuccess),
      map(() => actions.loadProjects())
    );
  });

  // Person effects
  savePersonSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Person').actions.saveValueSuccess),
      map(() => actions.loadProjects())
    );
  });

  deletePersonSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Person').actions.deleteValueSuccess),
      map(() => actions.loadProjects())
    );
  });

  // Tech effects
  saveTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Tech').actions.saveValueSuccess),
      map(() => actions.loadProjects())
    );
  });

  deleteTechSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Tech').actions.deleteValueSuccess),
      map(() => actions.loadProjects())
    );
  });

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private stateService: StateService
  ) {}
}
