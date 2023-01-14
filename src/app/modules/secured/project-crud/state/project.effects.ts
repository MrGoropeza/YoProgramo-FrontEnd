import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectService } from 'src/app/project/services/project.service';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudEffects } from 'src/core/classes/crud-state/crud.effects';
import { ProjectCrudComponent } from '../project-crud.component';
import { ProjectFormComponent } from '../project-form/project-form.component';



@Injectable()
export class ProjectEffects extends CrudEffects<appStateTypes> {

  constructor(
    actions$: Actions,
    dialogService: DialogService,
    messageService: MessageService,
    private stateService: StateService,
    private projectService: ProjectService,
  ) {
    super(
      actions$,
      dialogService,
      messageService,
      'Project',
      stateService.getState('Project').actions,
      ProjectCrudComponent,
      ProjectFormComponent,
      projectService
    );
  }
}
