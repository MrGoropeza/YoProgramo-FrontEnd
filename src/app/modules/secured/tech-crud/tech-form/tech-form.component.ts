import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';
import { selectTechOperationState } from '../state/tech.selectors';

@Component({
  selector: 'app-tech-form',
  templateUrl: './tech-form.component.html',
  styleUrls: ['./tech-form.component.scss']
})
export class TechFormComponent extends CrudFormComponent implements OnInit, OnDestroy{

  constructor(
    ref: DynamicDialogRef,
    config: DynamicDialogConfig,
    fb: FormBuilder,
    store: Store
  ) {
    super(ref, config, fb, store, selectTechOperationState);

    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      imageUrl: [null],
      description: [null, Validators.required],
      tipo: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  guardar(){
    this.form.markAllAsTouched();
  }

}
