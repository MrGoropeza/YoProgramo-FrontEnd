import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { Tech } from 'src/app/project/models/Tech.model';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { TechService } from 'src/app/project/services/tech.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import * as InicioActions from '../../../public/page-landing/state/inicio.actions';
import { TechCrudComponent } from '../tech-crud.component';
import { TechFormComponent } from '../tech-form/tech-form.component';

@Injectable()
export class TechEffects extends CrudEffects<appStateTypes>{

  state: CrudState<appStateTypes> = this.stateService.getState("Tech");

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private techService: TechService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      "Tech",
      stateService.getState("Tech").actions,
      InicioActions.loadInicios(),
      TechCrudComponent,
      TechFormComponent,
      techService
    );
  }

  // openTechTypes$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TechActions.openTechs),
  //       map(() => {
  //         this.dialogService.open(TechCrudComponent, {
  //           header: 'CRUD Tecnologías',
  //           styleClass: 'w-full lg:w-11/12',
  //         });
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  // closeTechTypes$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TechActions.closeTechs),
  //     map(() => InicioActions.loadTechsTypes())
  //   );
  // });

  // openTechForm$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TechActions.openTechsForm),
  //       map((action) => {
  //         this.dialogService.open(TechFormComponent, {
  //           header: action.tech
  //             ? `Editar Tecnología "${action.tech.name}"`
  //             : 'Agregar Tecnología',
  //           data: { techType: action.tech },
  //         });
  //         return InicioActions.loadTechsTypes();
  //       })
  //     );
  //   },
  // );

  // lastQuery!: LazyLoadEvent;

  override loadValues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.loadValues),
      concatMap((action) => {
        if (action.query) {
          this.lastQuery = action.query;
        }

        const query = window.btoa(JSON.stringify(this.lastQuery));

        return this.techService.getWithQueryCustom("", query).pipe(
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

  // saveTechSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TechActions.saveTechsSuccess),
  //     map(() => {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Éxito',
  //         detail: 'Tipo de Tecnología guardada con éxito.',
  //       });
  //       return TechActions.loadTechs({});
  //     })
  //   );
  // });

  // saveTechFailure$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TechActions.saveTechsFailure),
  //       map(() => {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: 'Error al guardar Tipo de Tecnología. Intente de nuevo.',
  //         });
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  // deleteTechType$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TechActions.deleteTechs),
  //     mergeMap((action) =>
  //       this.techService.delete(action.tech).pipe(
  //         map(() => TechActions.deleteTechsSuccess()),
  //         catchError((error) =>
  //           of(TechActions.deleteTechsFailure({ error }))
  //         )
  //       )
  //     )
  //   );
  // });

  // deleteTechSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TechActions.deleteTechsSuccess),
  //     map(() => {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Éxito',
  //         detail: 'Tipo de Tecnología eliminada con éxito.',
  //       });
  //       return TechActions.loadTechs({});
  //     })
  //   );
  // });

  // deleteTechFailure$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TechActions.deleteTechsFailure),
  //       map(() => {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: 'Error al eliminar Tipo de Tecnología. Intente de nuevo.',
  //         });
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );
}
