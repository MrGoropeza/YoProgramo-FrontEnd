/* eslint-disable @ngrx/prefer-action-creator-in-of-type */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, firstValueFrom, map, mergeMap, of, take } from 'rxjs';
import { Person } from 'src/app/project/models/Person.model';
import { AboutService } from 'src/app/project/services/about.service';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { TechService } from 'src/app/project/services/tech.service';
import { getSelectItemGroup } from 'src/app/project/utils/utils';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { AboutCrudComponent } from '../about-crud.component';

@Injectable()
export class AboutEffects extends CrudEffects<appStateTypes> {
  state: CrudState<appStateTypes> = this.stateService.getState('About');

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private aboutService: AboutService,
    private techService: TechService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'About',
      stateService.getState('About').actions,
      AboutCrudComponent,
      AboutCrudComponent,
      aboutService
    );
  }

  override loadCrudFormData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.loadCrudFormData),
      mergeMap(async () => {
        const techs = await firstValueFrom(this.techService.getAll());
        const data = { techs: getSelectItemGroup(techs) };
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
        mergeMap(async () => {
          let myInfo = await firstValueFrom(this.aboutService.getMyInfo());
          this.isFormDialogOpen = true;
          this.dialogService
            .open(AboutCrudComponent, {
              header: 'Editar Información Personal',
              data: { value: myInfo },
            })
            .onClose.pipe(
              take(1),
              map(() => (this.isFormDialogOpen = false))
            )
            .subscribe();
        })
      );
    },
    { dispatch: false }
  );

  // Tech effects
  saveTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Tech').actions.saveValueSuccess),
      map(() => {
        if (this.isFormDialogOpen) {
          return this.state.actions.loadCrudFormData();
        } else {
          return this.state.actions.loadCrudFormDataFailure({
            error: 'About Dialog not Open',
          });
        }
      })
    );
  });

  deleteTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.stateService.getState('Tech').actions.deleteValueSuccess),
      map(() => {
        if (this.isFormDialogOpen) {
          return this.state.actions.loadCrudFormData();
        } else {
          return this.state.actions.loadCrudFormDataFailure({
            error: 'About Dialog not Open',
          });
        }
      })
    );
  });

  override saveValue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.saveValue),
      mergeMap((action) => {
        return this.aboutService.saveMyInfo(action.value as Person).pipe(
          map(() => this.state.actions.saveValueSuccess()),
          catchError((error) =>
            of(this.state.actions.saveValueFailure({ error }))
          )
        );
      })
    );
  });

  override saveValueSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.saveValueSuccess),
      map(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `Datos personales guardados con éxito.`,
        });
        return this.state.actions.loadValues({});
      })
    );
  });

  override saveValueFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.state.actions.saveValueFailure),
        map(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al guardar datos personales. Intente de nuevo.`,
          });
        })
      );
    },
    { dispatch: false }
  );
}
