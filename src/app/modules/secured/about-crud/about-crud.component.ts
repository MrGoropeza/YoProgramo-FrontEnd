import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Person } from 'src/app/project/models/about.model';
import { Place } from 'src/app/project/models/place.model';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';

@Component({
  selector: 'app-about-crud',
  templateUrl: './about-crud.component.html',
  styleUrls: ['./about-crud.component.scss']
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
  ){
    super(ref, config, fb, store, stateService.getState('About'));

    this.form = fb.group({
      id: [null],
      name: [null, Validators.required],
      nameUrl: [null],
      title: [null, Validators.required],
      imageUrl: [null],
      actualWork: [null],
      actualCareer: [null],
    });
  }

  files: File[] = [];

  places: Place[] = [];

  ngOnInit(): void {
    this.init();
    if(this.config.data){
      this.places = this.config.data.places;
    }
  }
  ngOnDestroy(): void {
    this.destroy()
  }

  guardar(){
    this.cargando = true;
    this.form.markAllAsTouched();
    if(this.form.invalid){
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
      actualCareer: this.form.controls['actualCareer'].value
    } as Person;

    if (this.files.length > 0) {
      me = { ...me, imageFile: this.files[0] };
    }

    this.store.dispatch(this.state.actions.saveValue({ value: me }));

    this.savedValue();
  }

}
