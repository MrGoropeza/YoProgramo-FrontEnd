import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, map, of, switchMap } from 'rxjs';
import { User } from 'src/app/project/models/User.model';
import { AuthService } from 'src/app/project/services/auth.service';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { LoginComponent } from '../login.component';

@Injectable()
export class LoginEffects extends CrudEffects<appStateTypes> {
  state: CrudState<appStateTypes> = this.stateService.getState('Auth');

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private authService: AuthService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'Auth',
      stateService.getState('Auth').actions,
      LoginComponent,
      LoginComponent,
      authService
    );
  }

  override saveValue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.saveValue),
      switchMap((action) => {
        return this.authService.login(action.value as User).pipe(
          map((headers) => {
            const token = headers.get('Authorization')?.replace('Bearer ', '');
            if (token) {
              localStorage.setItem('token', token);
              return this.state.actions.saveValueSuccess();
            } else {
              return this.state.actions.saveValueFailure({
                error: 403,
              });
            }
          }),
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
          detail: `Sesión iniciada con éxito. En la terminal abajo a la derecha podés abrir todas las funcionalidades CRUD.`,
          life: 6000,
        });
        return this.state.actions.loadValues({});
      })
    );
  });

  override loadValues$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.loadValues),
      map(() =>
        this.state.actions.loadValuesSuccess({
          data: { data: [], totalRecords: 0 },
        })
      )
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
            detail: `Error al iniciar sesión. Revise las credenciales.`,
          });
        })
      );
    },
    { dispatch: false }
  );
}
