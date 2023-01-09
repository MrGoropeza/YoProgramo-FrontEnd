import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { firstValueFrom, mergeMap } from 'rxjs';
import { Experience } from 'src/app/project/models/Experience.model';
import { ExperienceService } from 'src/app/project/services/experience.service';
import { PlaceService } from 'src/app/project/services/place.service';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { ExpCrudComponent } from '../exp-crud.component';
import { ExpFormComponent } from '../exp-form/exp-form.component';

@Injectable()
export class ExpCrudEffects extends CrudEffects<appStateTypes> {
  state: CrudState<appStateTypes> = this.stateService.getState('Experience');

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private expService: ExperienceService,
    private placeService: PlaceService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'Experience',
      stateService.getState('Experience').actions,
      ExpCrudComponent,
      ExpFormComponent,
      expService
    );
  }

  override openCrudForm$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.state.actions.openCrudForm),
        mergeMap(async (action) => {
          let places = await firstValueFrom(this.placeService.getAll());
          this.dialogService.open(ExpFormComponent, {
            header: action.value
              ? `Editar ${this.state.modelName} "${
                  (action.value as Experience).place.name
                }"`
              : `Agregar ${this.state.modelName}`,
            data: { value: action.value, places },
          });
        })
      );
    },
    { dispatch: false }
  );
}
