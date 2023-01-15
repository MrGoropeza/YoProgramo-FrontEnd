/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, firstValueFrom, map, mergeMap, of } from 'rxjs';
import { EducationService } from 'src/app/project/services/education.service';
import { PlaceService } from 'src/app/project/services/place.service';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { EducationCrudComponent } from '../education-crud.component';
import { EducationFormComponent } from '../education-form/education-form.component';

@Injectable()
export class EducationCrudEffects extends CrudEffects<appStateTypes> {
  state: CrudState<appStateTypes> = this.stateService.getState('Education');

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private educationService: EducationService,
    private placeService: PlaceService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'Education',
      stateService.getState('Education').actions,
      EducationCrudComponent,
      EducationFormComponent,
      educationService
    );
  }

  override loadCrudFormData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.loadCrudFormData),
      mergeMap(async () => {
        const places = await firstValueFrom(this.placeService.getAll());
        const data = { places };
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
      map(() => {
        if (this.isFormDialogOpen) {
          return this.state.actions.loadCrudFormData();
        } else {
          return this.state.actions.loadCrudFormDataFailure({
            error: 'Education Form Dialog not Open',
          });
        }
      })
    );
  });

  deletePlaceSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Place').actions.deleteValueSuccess),
      map(() => {
        if (this.isFormDialogOpen) {
          return this.state.actions.loadCrudFormData();
        } else {
          return this.state.actions.loadCrudFormDataFailure({
            error: 'Education Form Dialog not Open',
          });
        }
      })
    );
  });
}
