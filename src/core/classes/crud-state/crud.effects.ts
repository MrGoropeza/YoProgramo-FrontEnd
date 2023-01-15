/* eslint-disable @typescript-eslint/no-explicit-any */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, concatMap, map, mergeMap, of, take } from 'rxjs';
import { appStateNames } from 'src/app/project/services/state.service';
import { CrudActions } from './crud.actions';
import { CrudService } from './crud.service';

export class CrudEffects<Model> {
  constructor(
    protected actions$: Actions,
    protected dialogService: DialogService,
    protected messageService: MessageService,
    private modelName: appStateNames,
    private crudActions: CrudActions<Model>,
    private crudComponent: any,
    private crudFormComponent: any,
    private modelService: CrudService<Model>
  ) {
    console.log(`${modelName} - Creando instancia de Effects`);
  }

  protected isCrudDialogOpen = false;
  protected isFormDialogOpen = false;

  openCrudDialog$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.crudActions.openCrudDialog),
        map(() => {
          this.isCrudDialogOpen = true;
          this.dialogService
            .open(this.crudComponent, {
              header: `CRUD ${this.modelName}s`,
              styleClass: 'w-full lg:w-11/12',
            })
            .onClose.pipe(
              take(1),
              map(() => (this.isCrudDialogOpen = false))
            )
            .subscribe();
        })
      );
    },
    { dispatch: false }
  );

  openCrudForm$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.crudActions.openCrudForm),
        map((action) => {
          this.isFormDialogOpen = true;
          this.dialogService
            .open(this.crudFormComponent, {
              header: action.value
                ? `Editar ${this.modelName} "${(action.value as any).name}"`
                : `Agregar ${this.modelName}`,
              data: { value: action.value },
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

  loadCrudFormData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.crudActions.openCrudForm),
      map(() => this.crudActions.loadCrudFormDataSuccess({})),
      catchError((error) =>
        of(this.crudActions.loadCrudFormDataFailure({ error }))
      )
    );
  });

  lastQuery!: LazyLoadEvent;

  loadValues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.crudActions.loadValues),
      concatMap((action) => {
        if (action.query) {
          this.lastQuery = action.query;
        }

        let query = '';
        if (this.lastQuery) {
          query = window.btoa(JSON.stringify(this.lastQuery));
        }

        return this.modelService.getWithQuery(query).pipe(
          map((data) =>
            this.crudActions.loadValuesSuccess({
              data: {
                data,
                totalRecords: this.modelService.totalRecords,
              },
            })
          ),
          catchError((error) =>
            of(this.crudActions.loadValuesFailure({ error }))
          )
        );
      })
    );
  });

  saveValue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.crudActions.saveValue),
      mergeMap((action) => {
        return this.modelService.add(action.value).pipe(
          map(() => this.crudActions.saveValueSuccess()),
          catchError((error) =>
            of(this.crudActions.saveValueFailure({ error }))
          )
        );
      })
    );
  });

  saveValueSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.crudActions.saveValueSuccess),
      map(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `${this.modelName} guardado con éxito.`,
        });
        if (this.isCrudDialogOpen) {
          return this.crudActions.loadValues({});
        } else {
          return this.crudActions.loadValuesFailure({
            error: `${this.modelName} CRUD Dialog not open`,
          });
        }
      })
    );
  });

  saveValueFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.crudActions.saveValueFailure),
        map(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al guardar ${this.modelName}. Intente de nuevo.`,
          });
        })
      );
    },
    { dispatch: false }
  );

  deleteValue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.crudActions.deleteValue),
      mergeMap((action) =>
        this.modelService.delete(action.value).pipe(
          map(() => this.crudActions.deleteValueSuccess()),
          catchError((error) =>
            of(this.crudActions.deleteValueFailure({ error }))
          )
        )
      )
    );
  });

  deleteValueSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.crudActions.deleteValueSuccess),
      map(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: `${this.modelName} eliminada con éxito.`,
        });
        if (this.isCrudDialogOpen) {
          return this.crudActions.loadValues({});
        } else {
          return this.crudActions.loadValuesFailure({
            error: `${this.modelName} CRUD Dialog not open`,
          });
        }
      })
    );
  });

  deleteValueFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.crudActions.deleteValueFailure),
        map(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `'Error al eliminar ${this.modelName}. Intente de nuevo.'`,
          });
        })
      );
    },
    { dispatch: false }
  );
}
