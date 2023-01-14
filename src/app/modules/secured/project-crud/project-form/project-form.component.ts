import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Project } from 'src/app/project/models/Project.model';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent
  extends CrudFormComponent<appStateTypes>
  implements OnInit, OnDestroy
{
  constructor(
    private stateService: StateService,
    ref: DynamicDialogRef,
    config: DynamicDialogConfig,
    fb: FormBuilder,
    store: Store
  ) {
    super(ref, config, fb, store, stateService.getState('Project'));

    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      url: [null, Validators.required],
      collab: [null],
      techs: [null],
      place: [null]
    });
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  guardar() {
    this.cargando = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.cargando = false;
      return;
    }

    let value: Project = { ...this.form.getRawValue() };

    this.store.dispatch(this.state.actions.saveValue({ value }));

    this.savedValue();
  }
}
