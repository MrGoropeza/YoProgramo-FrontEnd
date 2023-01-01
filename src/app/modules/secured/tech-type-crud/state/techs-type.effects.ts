import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import TechTypeCrudComponent from '../tech-type-crud.component';
import { TechTypeFormComponent } from '../tech-type-form/tech-type-form.component';
import { TechtypeService } from 'src/app/project/services/techtype.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';

@Injectable()
export class TechTypeEffects extends CrudEffects<appStateTypes>{
  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private techTypeService: TechtypeService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      "TechType",
      stateService.getState("TechType").actions,
      TechTypeCrudComponent,
      TechTypeFormComponent,
      techTypeService
    );
  }

  // openTechTypes$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TechTypeActions.openTechsTypes),
  //       map(() => {
  //         this.dialogService.open(TechTypeCrudComponent, {
  //           header: 'CRUD Tipo de Tecnologías',
  //           styleClass: 'w-full lg:w-11/12',
  //         });
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  // closeTechTypes$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TechTypeActions.closeTechsTypes),
  //     map(() => InicioActions.loadTechsTypes())
  //   );
  // });

  // openTechTypesForm$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TechTypeActions.openTechsTypesForm),
  //       map((action) => {
  //         this.dialogService.open(TechTypeFormComponent, {
  //           header: action.techType
  //             ? `Editar Tipo de Tecnología "${action.techType.name}"`
  //             : 'Agregar Tipo de Tecnología',
  //           data: { techType: action.techType },
  //         });
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );

  // loadTechTypes$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TechTypeActions.loadTechsTypes),
  //     concatMap((action) => {
  //       if (action.query) {
  //         this.lastQuery = action.query;
  //       }

  //       const query = window.btoa(JSON.stringify(this.lastQuery));

  //       return this.techTypeService.getWithQuery(query).pipe(
  //         map((data) =>
  //           TechTypeActions.loadTechsTypesSuccess({
  //             data: {
  //               data,
  //               totalRecords: this.techTypeService.totalRecords,
  //             },
  //           })
  //         ),
  //         catchError((error) =>
  //           of(TechTypeActions.loadTechsTypesFailure({ error }))
  //         )
  //       );
  //     })
  //   );
  // });

  // saveTechType$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TechTypeActions.saveTechsTypes),
  //     mergeMap((action) => {
  //       return this.techTypeService.add(action.techType).pipe(
  //         map(() => TechTypeActions.saveTechsTypesSuccess()),
  //         catchError((error) =>
  //           of(TechTypeActions.saveTechsTypesFailure({ error }))
  //         )
  //       );
  //     })
  //   );
  // });

  // saveTechSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TechTypeActions.saveTechsTypesSuccess),
  //     map(() => {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Éxito',
  //         detail: 'Tipo de Tecnología guardada con éxito.',
  //       });
  //       return TechTypeActions.loadTechsTypes({});
  //     })
  //   );
  // });

  // saveTechFailure$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TechTypeActions.saveTechsTypesFailure),
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
  //     ofType(TechTypeActions.deleteTechsTypes),
  //     mergeMap((action) =>
  //       this.techTypeService.delete(action.techType).pipe(
  //         map(() => TechTypeActions.deleteTechsTypesSuccess()),
  //         catchError((error) =>
  //           of(TechTypeActions.deleteTechsTypesFailure({ error }))
  //         )
  //       )
  //     )
  //   );
  // });

  // deleteTechSuccess$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(TechTypeActions.deleteTechsTypesSuccess),
  //     map(() => {
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Éxito',
  //         detail: 'Tipo de Tecnología eliminada con éxito.',
  //       });
  //       return TechTypeActions.loadTechsTypes({});
  //     })
  //   );
  // });

  // deleteTechFailure$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(TechTypeActions.deleteTechsTypesFailure),
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
