import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Place } from 'src/app/project/models/place.model';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent
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
    super(ref, config, fb, store, stateService.getState('Place'));

    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      url: [null],
      imageUrl: [null],
      description: [null, Validators.required],
      isLink: [false],
    });
  }

  files: File[] = [];

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

    let place: Place = {
      id: this.form.controls['id'].value,
      name: this.form.controls['name'].value,
      url: this.form.controls['url'].value ?? null,
      imageUrl: this.form.controls['imageUrl'].value ?? null,
      description: this.form.controls['description'].value,
    } as Place;

    if (this.files.length > 0) {
      place = { ...place, imageFile: this.files[0] };
    }

    this.store.dispatch(this.state.actions.saveValue({ value: place }));

    this.savedValue();
  }
}
