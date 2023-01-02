import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  BehaviorSubject,
  debounceTime,
  delay,
  distinctUntilChanged,
  Subscription,
} from 'rxjs';
import { Place } from 'src/app/project/models/place.model';
import {
  appStateTypes,
  StateService,
} from 'src/app/project/services/state.service';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';
import { NOIMAGELINK } from 'src/core/consts/no-image';

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

  imageLink$ = new BehaviorSubject<string>(NOIMAGELINK);
  formImageLinkSub$!: Subscription;
  imageLinkValid$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.init();
    if (this.form.controls['imageUrl'].value === NOIMAGELINK) {
      this.form.controls['imageUrl'].setValue(null);
    } else {
      this.form.controls['isLink'].setValue(true);
      this.imageLink$.next(this.form.controls['imageUrl'].value);
      this.imageLinkValid$.next(true);
    }
    this.formImageLinkSub$ = this.form.controls['imageUrl'].valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        if (value === NOIMAGELINK && this.imageLink$.value !== NOIMAGELINK) {
          this.imageLink$.next(NOIMAGELINK);
          this.form.controls['imageUrl'].setValue(null);
        }
        this.imageLink$.next(value);
        this.imageLinkValid$.next(true);
        let sub$ = this.imageLinkValid$.pipe(delay(200)).subscribe((valid) => {
          if (valid) {
            this.form.controls['imageUrl'].setValue(value);
          }
          sub$.unsubscribe();
        });
      });
  }

  imageError() {
    this.imageLink$.next(NOIMAGELINK);
    this.imageLinkValid$.next(false);
  }

  ngOnDestroy(): void {
    this.destroy();
    if (this.formImageLinkSub$) {
      this.formImageLinkSub$.unsubscribe();
    }
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
      imageUrl: this.imageLinkValid$.value
        ? this.form.controls['imageUrl'].value
        : null,
      description: this.form.controls['description'].value,
    } as Place;

    if (this.files.length > 0) {
      place = { ...place, imageFile: this.files[0] };
    }

    this.store.dispatch(this.state.actions.saveValue({ value: place }));

    this.savedValue();
  }
}
