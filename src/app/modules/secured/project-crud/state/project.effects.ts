/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, firstValueFrom, map, mergeMap, of } from 'rxjs';
import { PersonService } from 'src/app/project/services/person.service';
import { PlaceService } from 'src/app/project/services/place.service';
import { ProjectService } from 'src/app/project/services/project.service';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { TechService } from 'src/app/project/services/tech.service';
import { getSelectItemGroup } from 'src/app/project/utils/utils';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { ProjectCrudComponent } from '../project-crud.component';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Injectable()
export class ProjectEffects extends CrudEffects<appStateTypes> {
  state: CrudState<appStateTypes> = this.stateService.getState('Project');

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private projectService: ProjectService,
    private techService: TechService,
    private personService: PersonService,
    private placeService: PlaceService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'Project',
      stateService.getState('Project').actions,
      ProjectCrudComponent,
      ProjectFormComponent,
      projectService
    );
  }

  override loadCrudFormData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.loadCrudFormData),
      mergeMap(async () => {
        const places = await firstValueFrom(this.placeService.getAll());
        const persons = await firstValueFrom(this.personService.getAll());
        const techs = await firstValueFrom(this.techService.getAll());
        const data = { places, persons, techs: getSelectItemGroup(techs) };
        console.log(data);

        return this.state.actions.loadCrudFormDataSuccess({ data });
      }),
      catchError((error) =>
        of(this.state.actions.loadCrudFormDataFailure({ error }))
      )
    );
  });

  // Place effects
  savePlaceSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.saveValueSuccess),
      map(() => this.state.actions.loadCrudFormData())
    );
  });

  deletePlaceSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.deleteValueSuccess),
      map(() => this.state.actions.loadCrudFormData())
    );
  });

  // Tech effects
  saveTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Tech').actions.saveValueSuccess),
      map(() => this.state.actions.loadCrudFormData())
    );
  });

  deleteTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Tech').actions.deleteValueSuccess),
      map(() => this.state.actions.loadCrudFormData())
    );
  });

  // Person effects
  savePersonSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Person').actions.saveValueSuccess),
      map(() => this.state.actions.loadCrudFormData())
    );
  });

  deletePersonSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Person').actions.deleteValueSuccess),
      map(() => this.state.actions.loadCrudFormData())
    );
  });
}
