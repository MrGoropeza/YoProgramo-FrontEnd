import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
      name: [null, Validators.required],
      nameUrl: [null],
      title: [null, Validators.required],
      imageUrl: [null],
      actualWork: [null],
      actualCareer: [null],
    });
  }

  profileImage!: File;

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

  }

}
