import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';

@Component({
  selector: 'app-tech-type-form',
  templateUrl: './tech-type-form.component.html',
  styleUrls: ['./tech-type-form.component.scss'],
})
export class TechTypeFormComponent
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
    super(ref, config, fb, store, stateService.getState('TechType'));

    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
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

    let techType = Object.keys(this.form.controls).reduce(
      (prevValue: any, control) => {
        prevValue[control] = this.form.get(control)?.value;
        return prevValue;
      },
      {}
    );

    const saveAction = this.state.actions.saveValue({
      value: techType,
    });
    this.store.dispatch(saveAction);
    this.savedValue();
  }
}
