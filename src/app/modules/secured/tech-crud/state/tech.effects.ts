import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import * as TechActions from './tech.actions';
import * as InicioActions from '../../../public/page-landing/state/inicio.actions';
import { TechService } from 'src/app/project/services/tech.service';
import { TechCrudComponent } from '../tech-crud.component';

@Injectable()
export class TechEffects {
  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private messageService: MessageService,
    private techService: TechService
  ) {}

  openTechTypes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TechActions.openTechs),
        map(() => {
          this.dialogService.open(TechCrudComponent, {
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
      ofType(TechActions.closeTechs),
      map(() => InicioActions.loadTechsTypes())
    );
  });

  // openTechTypesForm$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TechActions.openTechsForm),
  //       map((action) => {
  //         this.dialogService.open(TechTypeFormComponent, {
  //           header: action.tech
  //             ? `Editar Tipo de Tecnología "${action.tech.name}"`
  //             : 'Agregar Tipo de Tecnología',
  //           data: { techType: action.tech },
  //         });
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  lastQuery!: LazyLoadEvent;

  loadTechTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TechActions.loadTechs),
      concatMap((action) => {
        if (action.query) {
          this.lastQuery = action.query;
        }

        const query = window.btoa(JSON.stringify(this.lastQuery));

        return this.techService.getWithQuery(query).pipe(
          map((data) =>
            TechActions.loadTechsSuccess({
              data: {
                data: data,
                totalRecords: this.techService.totalRecords,
              },
            })
          ),
          catchError((error) =>
            of(TechActions.loadTechsFailure({ error }))
          )
        );
      })
    );
  });

  saveTechType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TechActions.saveTechs),
      mergeMap((action) => {
        return this.techService.add(action.tech).pipe(
          map(() => TechActions.saveTechsSuccess()),
          catchError((error) =>
            of(TechActions.saveTechsFailure({ error }))
          )
        );
      })
    );
  });

  saveTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TechActions.saveTechsSuccess),
      map(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tipo de Tecnología guardada con éxito.',
        });
        return TechActions.loadTechs({});
      })
    );
  });

  saveTechFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TechActions.saveTechsFailure),
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
      ofType(TechActions.deleteTechs),
      mergeMap((action) =>
        this.techService.delete(action.tech).pipe(
          map(() => TechActions.deleteTechsSuccess()),
          catchError((error) =>
            of(TechActions.deleteTechsFailure({ error }))
          )
        )
      )
    );
  });

  deleteTechSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TechActions.deleteTechsSuccess),
      map(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Tipo de Tecnología eliminada con éxito.',
        });
        return TechActions.loadTechs({});
      })
    );
  });

  deleteTechFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(TechActions.deleteTechsFailure),
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
