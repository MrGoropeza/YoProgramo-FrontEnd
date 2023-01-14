import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SelectItemGroup } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { map, Observable } from 'rxjs';
import { Person } from 'src/app/project/models/Person.model';
import { Place } from 'src/app/project/models/Place.model';
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

  persons!: Observable<Person[]>;
  techs!: Observable<SelectItemGroup[]>;
  places!: Observable<Place[]>;

  ngOnInit(): void {
    this.init();
    this.store.dispatch(this.state.actions.loadCrudFormData());
    const data = this.store.select(this.state.selectors.selectFormData);
    this.persons = data.pipe(
      map(
        (value) => value.persons
      )
    );
    this.techs = data.pipe(
      map(
        (value) => value.techs
      )
    );
    this.places = data.pipe(
      map(
        (value) => value.places
      )
    );
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
