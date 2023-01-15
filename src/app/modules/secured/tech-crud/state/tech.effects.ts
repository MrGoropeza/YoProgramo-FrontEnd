/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, concatMap, firstValueFrom, map, mergeMap, of } from 'rxjs';
import { Tech } from 'src/app/project/models/Tech.model';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { TechService } from 'src/app/project/services/tech.service';
import { TechtypeService } from 'src/app/project/services/techtype.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { TechCrudComponent } from '../tech-crud.component';
import { TechFormComponent } from '../tech-form/tech-form.component';

@Injectable()
export class TechEffects extends CrudEffects<appStateTypes> {
  state: CrudState<appStateTypes> = this.stateService.getState('Tech');

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private techService: TechService,
    private techTypeService: TechtypeService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'Tech',
      stateService.getState('Tech').actions,
      TechCrudComponent,
      TechFormComponent,
      techService
    );
  }

  override loadCrudFormData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.loadCrudFormData),
      mergeMap(async () => {
        const techTypes = await firstValueFrom(this.techTypeService.getAll());
        const data = { techTypes };
        return this.state.actions.loadCrudFormDataSuccess({ data });
      }),
      catchError((error) =>
        of(this.state.actions.loadCrudFormDataFailure({ error }))
      )
    );
  });

  override openCrudForm$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.state.actions.openCrudForm),
        mergeMap(async (action) => {
          this.dialogService.open(TechFormComponent, {
            header: action.value
              ? `Editar Tecnología "${(action.value as Tech).name}"`
              : 'Agregar Tecnología',
            data: { value: action.value },
          });
        })
      );
    },
    { dispatch: false }
  );

  // TechType effects
  saveTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('TechType').actions.saveValueSuccess),
      map(() => this.state.actions.loadCrudFormData())
    );
  });

  deleteTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('TechType').actions.deleteValueSuccess),
      map(() => this.state.actions.loadCrudFormData())
    );
  });

  override loadValues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.loadValues),
      concatMap((action) => {
        if (action.query) {
          this.lastQuery = action.query;
        }

        const query = window.btoa(JSON.stringify(this.lastQuery));

        return this.techService.getWithQueryCustom('', this.lastQuery ? query : '').pipe(
          map((data) =>
            this.state.actions.loadValuesSuccess({
              data: {
                data: data,
                totalRecords: this.techService.totalRecords,
              },
            })
          ),
          catchError((error) =>
            of(this.state.actions.loadValuesFailure({ error }))
          )
        );
      })
    );
  });

  override saveValue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.saveValue),
      mergeMap((action) => {
        return this.techService.addCustom(action.value as Tech).pipe(
          map(() => this.state.actions.saveValueSuccess()),
          catchError((error) =>
            of(this.state.actions.saveValueFailure({ error }))
          )
        );
      })
    );
  });
}
