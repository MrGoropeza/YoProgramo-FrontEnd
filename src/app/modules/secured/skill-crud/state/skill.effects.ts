import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SkillService } from 'src/app/project/services/skill.service';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { SkillCrudComponent } from '../skill-crud.component';
import { SkillFormComponent } from '../skill-form/skill-form.component';



@Injectable()
export class SkillEffects extends CrudEffects<appStateTypes> {

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private skillService: SkillService,
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'Skill',
      stateService.getState('Skill').actions,
      SkillCrudComponent,
      SkillFormComponent,
      skillService
    );
  }
}
