import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { mergeMap, map, catchError, of } from 'rxjs';
import { Person } from 'src/app/project/models/Person.model';
import { PersonService } from 'src/app/project/services/person.service';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { CrudState } from 'src/core/classes/crud-state/crud.reducer';
import { PersonCrudComponent } from '../person-crud.component';
import { PersonFormComponent } from '../person-form/person-form.component';

@Injectable()
export class PersonEffects extends CrudEffects<appStateTypes> {
  state: CrudState<appStateTypes> = this.stateService.getState("Person");

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private personService: PersonService
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      "Person",
      stateService.getState("Person").actions,
      PersonCrudComponent,
      PersonFormComponent,
      personService
    );
  }

  override saveValue$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(this.state.actions.saveValue),
      mergeMap((action) => {
        return this.personService.add(action.value as Person).pipe(
          map(() => this.state.actions.saveValueSuccess()),
          catchError((error) =>
            of(this.state.actions.saveValueFailure({ error }))
          )
        );
      })
    );
  });
}
