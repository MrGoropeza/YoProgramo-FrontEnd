import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, concatMap, map, of } from 'rxjs';
import { TechnologiesService } from 'src/app/project/services/technologies.service';
import { TechTypeCrudComponent } from '../tech-type-crud.component';
import { TechTypeFormComponent } from '../tech-type-form/tech-type-form.component';
import * as TechTypeActions from './techs-type.actions';

@Injectable()
export class TechTypeEffects {

  dialogRef!: DynamicDialogRef;

  constructor(
    private actions$: Actions,
    private techService: TechnologiesService,
    private dialogService: DialogService
  ) {}

  openTechTypes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TechTypeActions.openTechsTypes),
        map(() => {
          this.dialogRef = this.dialogService.open(TechTypeCrudComponent, {
            header: 'CRUD Tipo de Tecnologías',
            styleClass: 'w-full lg:w-11/12',
          });
        })
      );
    },
    { dispatch: false }
  );

  closeTechTypes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TechTypeActions.closeTechsTypes),
        map(() => {
          if (this.dialogRef) {
            this.dialogRef.close();
          }
        })
      );
    },
    { dispatch: false }
  );

  openTechTypesForm$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TechTypeActions.openTechsTypesForm),
        map((action) => {
          this.dialogService.open(TechTypeFormComponent, {
            header: action.techType ? `Editar Tipo de Tecnología "${action.techType.name}"` : 'Agregar Tipo de Tecnología',
            data: { techType: action.techType },
          });
        })
      );
    },
    { dispatch: false }
  );

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
