import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, Observable, startWith } from 'rxjs';
import { DateSelectionMode } from 'src/app/components/ui-calendar-input/ui-calendar-input.component';
import { Education } from 'src/app/project/models/Education.model';
import { Place } from 'src/app/project/models/Place.model';
import { appStateTypes, StateService } from 'src/app/project/services/state.service';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';
import { DateRangeValidator } from 'src/core/validators/DateRange.validator';

@Component({
  selector: 'app-education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.scss']
})
export class EducationFormComponent extends CrudFormComponent<appStateTypes> implements OnInit,OnDestroy {

  constructor(
    private stateService: StateService,
    ref: DynamicDialogRef,
    config: DynamicDialogConfig,
    fb: FormBuilder,
    store: Store
  ) {
    super(ref, config, fb, store, stateService.getState('Education'));

    this.form = this.fb.group({
      id: [null],
      place: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      timeRange: [null, DateRangeValidator()],
      actualEducation: [false],
    });
  }

  places!: Observable<Place[]>;
  dateSelectionMode: DateSelectionMode = "range";

  ngOnInit(): void {
    this.init();
    this.store.dispatch(this.state.actions.loadCrudFormData());
    const data = this.store.select(this.state.selectors.selectFormData);
    this.places = data.pipe(map((value) => value.places));
    if (this.config.data) {
      if(this.config.data.value){
        const exp: Education = this.config.data.value;

        let range = [new Date(exp.startDate), exp.finishDate ? new Date(exp.finishDate) : null];
        if(exp.actualEducation){
          this.form.controls["timeRange"].setValue(range[0]);
        }else{
          this.form.controls["timeRange"].setValue(range);
        }
      }
    }
    this.suscriptions$.add(this.form.controls['actualEducation'].valueChanges
      .pipe(startWith(this.form.controls['actualEducation'].value))
      .subscribe((isActualEducation) => {
        let timeRangeControl = this.form.controls['timeRange'];
        if (isActualEducation) {
          timeRangeControl.setValidators(Validators.required);
          this.dateSelectionMode = "single";
        } else {
          timeRangeControl.setValidators(DateRangeValidator());
          this.dateSelectionMode = "range";
        }
        timeRangeControl.updateValueAndValidity();
      }));
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  addPlace(){
    this.store.dispatch(
      this.stateService.getState('Place').actions.openCrudForm({})
    );
  }

  guardar() {
    this.cargando = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.cargando = false;
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let { timeRange: _, ...formValue } = this.form.getRawValue();

    let value: Education;

    let dateRange: Date[] = this.form.controls['timeRange'].value;

    if (this.form.controls['actualEducation'].value) {
      value = { ...formValue, startDate: this.form.controls['timeRange'].value };
    } else {
      value = { ...formValue, startDate: dateRange[0], finishDate: dateRange[1] };
    }

    this.store.dispatch(this.state.actions.saveValue({ value }));

    this.savedValue();
  }

}
