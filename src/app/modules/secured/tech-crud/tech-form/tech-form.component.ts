import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Tech } from 'src/app/project/models/Tech.model';
import { TechType } from 'src/app/project/models/TechType.model';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';

@Component({
  selector: 'app-tech-form',
  templateUrl: './tech-form.component.html',
  styleUrls: ['./tech-form.component.scss'],
})
export class TechFormComponent
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
    super(ref, config, fb, store, stateService.getState('Tech'));

    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      imageUrl: [null],
      description: [null, Validators.required],
      tipo: [null, Validators.required],
      isLink: [false],
    });
  }

  files: File[] = [];

  ngOnInit(): void {
    this.init();
    if (this.form.controls['imageUrl'].value) {
      this.form.controls['isLink'].setValue(true);
    }
    if(this.config.data){
      this.tipos = this.config.data.techTypes;
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  tipos!: Observable<TechType[]>;

  guardar() {
    this.cargando = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.cargando = false;
      return;
    }

    let tech: Tech = {
      id: this.form.controls['id'].value,
      name: this.form.controls['name'].value,
      imageUrl: this.form.controls['imageUrl'].value ?? null,
      description: this.form.controls['description'].value,
      tipo: this.form.controls['tipo'].value,
    } as Tech;

    if (this.files.length > 0) {
      tech = { ...tech, imageFile: this.files[0] };
    }

    this.store.dispatch(this.state.actions.saveValue({ value: tech }));

    this.savedValue();
  }
}
