import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Place } from 'src/app/project/models/Place.model';
import { PlaceService } from 'src/app/project/services/place.service';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { PlaceCrudComponent } from '../place-crud.component';
import { PlaceFormComponent } from '../place-form/place-form.component';



@Injectable()
export class PlaceEffects extends CrudEffects<appStateTypes>{

  state: CrudState<appStateTypes> = this.stateService.getState("Place");

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private placeService: PlaceService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      "Place",
      stateService.getState("Place").actions,
      PlaceCrudComponent,
      PlaceFormComponent,
      placeService
    );
  }

  override saveValue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.saveValue),
      mergeMap((action) => {
        return this.placeService.addCustom(action.value as Place).pipe(
          map(() => this.state.actions.saveValueSuccess()),
          catchError((error) =>
            of(this.state.actions.saveValueFailure({ error }))
          )
        );
      })
    );
  });
}
