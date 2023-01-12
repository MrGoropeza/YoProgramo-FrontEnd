import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { firstValueFrom, mergeMap } from 'rxjs';
import { Education } from 'src/app/project/models/Education.model';
import { EducationService } from 'src/app/project/services/education.service';
import { PlaceService } from 'src/app/project/services/place.service';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { EducationCrudComponent } from '../education-crud.component';
import { EducationFormComponent } from '../education-form/education-form.component';



@Injectable()
export class EducationCrudEffects extends CrudEffects<appStateTypes>  {
  state: CrudState<appStateTypes> = this.stateService.getState('Education');

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private educationService: EducationService,
    private placeService: PlaceService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'Education',
      stateService.getState('Education').actions,
      EducationCrudComponent,
      EducationFormComponent,
      educationService
    );
  }

  override openCrudForm$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(this.state.actions.openCrudForm),
        mergeMap(async (action) => {
          let places = await firstValueFrom(this.placeService.getAll());
          this.dialogService.open(EducationFormComponent, {
            header: action.value
              ? `Editar ${this.state.modelName} "${
                  (action.value as Education).place.name
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
