import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SelectItemGroup } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, Observable } from 'rxjs';
import { Person } from 'src/app/project/models/Person.model';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';

@Component({
  selector: 'app-about-crud',
  templateUrl: './about-crud.component.html',
  styleUrls: ['./about-crud.component.scss'],
})
export class AboutCrudComponent
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
    super(ref, config, fb, store, stateService.getState('About'));

    this.form = fb.group({
      id: [null],
      name: [null, Validators.required],
      nameUrl: [null],
      title: [null, Validators.required],
      techs: [null],
      imageUrl: [null],
      actualWork: [null],
      actualCareer: [null],
    });
  }

  files: File[] = [];

  techs!: Observable<SelectItemGroup[]>;

  ngOnInit(): void {
    this.init();
    this.store.dispatch(this.state.actions.loadCrudFormData());
    const data = this.store.select(this.state.selectors.selectFormData);
    this.techs = data.pipe(map((value) => value.techs));
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  addTech() {
    this.store.dispatch(
      this.stateService.getState('Tech').actions.openCrudForm({})
    );
  }

  guardar() {
    this.cargando = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.cargando = false;
      return;
    }

    let me = {
      id: this.form.controls['id'].value,
      itsMe: true,
      name: this.form.controls['name'].value,
      nameUrl: this.form.controls['nameUrl'].value,
      title: this.form.controls['title'].value,
      imageUrl: this.form.controls['imageUrl'].value,
      actualWork: this.form.controls['actualWork'].value,
      actualCareer: this.form.controls['actualCareer'].value,
      techs: this.form.controls['techs'].value
    } as Person;

    if (this.files.length > 0) {
      me = { ...me, imageFile: this.files[0] };
    }

    this.store.dispatch(this.state.actions.saveValue({ value: me }));

    this.savedValue();
  }
}
