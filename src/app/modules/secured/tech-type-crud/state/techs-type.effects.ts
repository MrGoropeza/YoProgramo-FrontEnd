import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { TechnologiesService } from 'src/app/project/services/technologies.service';
import { TechTypeCrudComponent } from '../tech-type-crud.component';
import { TechTypeFormComponent } from '../tech-type-form/tech-type-form.component';
import * as TechTypeActions from './techs-type.actions';
import * as InicioActions from '../../../public/page-landing/state/inicio.actions';

@Injectable()
export class TechTypeEffects {
  constructor(
    private actions$: Actions,
    private techService: TechnologiesService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  openTechTypes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TechTypeActions.openTechsTypes),
        map(() => {
          this.dialogService.open(TechTypeCrudComponent, {
            header: 'CRUD Tipo de Tecnologías',
            styleClass: 'w-full lg:w-11/12',
          });
        })
      );
    },
    { dispatch: false }
  );

  closeTechTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TechTypeActions.closeTechsTypes),
      map(() => InicioActions.loadTechsTypes())
    );
  });

  openTechTypesForm$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TechTypeActions.openTechsTypesForm),
        map((action) => {
          this.dialogService.open(TechTypeFormComponent, {
            header: action.techType
              ? `Editar Tipo de Tecnología "${action.techType.name}"`
              : 'Agregar Tipo de Tecnología',
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

  saveTechType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TechTypeActions.saveTechsTypes),
      mergeMap((action) =>
        this.techService.saveTechType(action.techType).pipe(
          map(() => TechTypeActions.saveTechsTypesSuccess()),
          catchError((error) =>
            of(TechTypeActions.saveTechsTypesFailure({ error }))
          )
        )
      )
    );
  });

  saveTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TechTypeActions.saveTechsTypesSuccess),
      map(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tipo de Tecnología guardada con éxito.',
        });
        return TechTypeActions.loadTechsTypes({});
      })
    );
  });

  saveTechFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TechTypeActions.saveTechsTypesFailure),
        map(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al guardar Tipo de Tecnología. Intente de nuevo.',
          });
        })
      );
    },
    { dispatch: false }
  );

  deleteTechType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TechTypeActions.deleteTechsTypes),
      mergeMap((action) =>
        this.techService.deleteTechType(action.techType).pipe(
          map(() => TechTypeActions.deleteTechsTypesSuccess()),
          catchError((error) =>
            of(TechTypeActions.deleteTechsTypesFailure({ error }))
          )
        )
      )
    );
  });

  deleteTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TechTypeActions.deleteTechsTypesSuccess),
      map(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tipo de Tecnología eliminada con éxito.',
        });
        return TechTypeActions.loadTechsTypes({});
      })
    );
  });

  deleteTechFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TechTypeActions.deleteTechsTypesFailure),
        map(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al eliminar Tipo de Tecnología. Intente de nuevo.',
          });
        })
      );
    },
    { dispatch: false }
  );
}
