import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, firstValueFrom, map, mergeMap, Observable, of } from 'rxjs';
import { Person } from 'src/app/project/models/about.model';
import { Place } from 'src/app/project/models/place.model';
import { AboutService } from 'src/app/project/services/about.service';
import { PlaceService } from 'src/app/project/services/place.service';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
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
    private placeService: PlaceService
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

  override deleteValue$!: never;
  override deleteValueFailure$!: never;
  override deleteValueSuccess$!: never;

  override loadValues$!: never;

  override openCrudDialog$!: never;

  override openCrudForm$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.state.actions.openCrudForm),
        mergeMap(async () => {
          let places = await firstValueFrom(this.placeService.getAll() as Observable<Place[]>)
          let myInfo = await firstValueFrom(this.aboutService.getMyInfo());

          this.dialogService.open(AboutCrudComponent, {
            header: 'Editar Informaci??n Personal',
            data: { value: myInfo, places },
          });
        })
      );
    },
    { dispatch: false }
  );

  override saveValue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.saveValue),
      mergeMap((action) => {
        return this.aboutService.saveMyInfo(action.value as Person).pipe(
          map(() => this.state.actions.saveValueSuccess()),
          catchError((error) => of(this.state.actions.saveValueFailure({error})))
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
          summary: '??xito',
          detail: `Datos personales guardados con ??xito.`,
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
