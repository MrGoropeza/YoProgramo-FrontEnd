import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { startWith, Subscription } from 'rxjs';
import { Experience } from 'src/app/project/models/Experience.model';
import { Place } from 'src/app/project/models/Place.model';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';
import { DateRangeValidator } from 'src/core/validators/DateRange.validator';

@Component({
  selector: 'app-exp-form',
  templateUrl: './exp-form.component.html',
  styleUrls: ['./exp-form.component.scss'],
})
export class ExpFormComponent
  extends CrudFormComponent<appStateTypes>
  implements OnInit, OnDestroy
{
  isActualWorkSub$!: Subscription;

  constructor(
    private stateService: StateService,
    ref: DynamicDialogRef,
    config: DynamicDialogConfig,
    fb: FormBuilder,
    store: Store
  ) {
    super(ref, config, fb, store, stateService.getState('Experience'));

    this.form = this.fb.group({
      id: [null],
      place: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      timeRange: [null, DateRangeValidator()],
      actualWork: [false],
    });
  }

  places: Place[] = [];

  ngOnInit(): void {
    this.init();
    if (this.config.data) {
      this.places = this.config.data.places;
      if(this.config.data.value){
        const exp: Experience = this.config.data.value;

        let range = [new Date(exp.startDate), exp.finishDate ? new Date(exp.finishDate) : null];
        this.form.controls["timeRange"].setValue(range);
      }
    }
    this.isActualWorkSub$ = this.form.controls['actualWork'].valueChanges
      .pipe(startWith(this.form.controls['actualWork'].value))
      .subscribe((isActualWork) => {
        let timeRangeControl = this.form.controls['timeRange'];
        if (isActualWork) {
          timeRangeControl.setValidators(Validators.required);
        } else {
          timeRangeControl.setValidators(DateRangeValidator());
        }
        timeRangeControl.updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    this.destroy();
    if (this.isActualWorkSub$) {
      this.isActualWorkSub$.unsubscribe();
    }
  }

  guardar() {
    this.cargando = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.cargando = false;
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let { timeRange: _, ...exp } = this.form.getRawValue();

    let value: Experience;

    let dateRange: Date[] = this.form.controls['timeRange'].value;

    if (this.form.controls['actualWork'].value) {
      value = { ...exp, startDate: dateRange[0] };
    } else {
      value = { ...exp, startDate: dateRange[0], finishDate: dateRange[1] };
    }

    this.store.dispatch(this.state.actions.saveValue({ value }));

    this.savedValue();
  }
}