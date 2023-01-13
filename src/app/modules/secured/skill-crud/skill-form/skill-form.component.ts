import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Skill } from 'src/app/project/models/Skill.model';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss'],
})
export class SkillFormComponent
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
    super(ref, config, fb, store, stateService.getState('Skill'));

    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      value: [null, Validators.compose([Validators.required, Validators.min(0), Validators.max(100)])],
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

    let value: Skill = { ...this.form.getRawValue() };

    this.store.dispatch(this.state.actions.saveValue({ value }));

    this.savedValue();
  }
}
