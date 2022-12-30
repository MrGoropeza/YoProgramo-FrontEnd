import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { TechType } from 'src/app/project/models/TechType.model';
import { TechtypeService } from 'src/app/project/services/techtype.service';
import { saveTechsTypes } from '../state/techs-type.actions';
import { selectTechTypesOperationState } from '../state/techs-type.selectors';

@Component({
  selector: 'app-tech-type-form',
  templateUrl: './tech-type-form.component.html',
  styleUrls: ['./tech-type-form.component.scss']
})
export class TechTypeFormComponent implements OnInit, OnDestroy {

  form = this.fb.group({
    id: [null],
    name: [null, Validators.required]
  });

  constructor(
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private store: Store,
    private techTypeService: TechtypeService
  ){}
  
  ngOnInit(): void {
    if(this.config.data){
      this.form.patchValue(this.config.data.techType);
    }
  }

  saved!: Subscription;

  ngOnDestroy(): void {
    if(this.saved){
      this.saved.unsubscribe();
    }
  }

  cargando = false;

  cancelar(){
    this.cargando = false;
    this.ref.close();
  }

  guardar(){
    this.cargando = true;
    this.form.markAllAsTouched();
    if(this.form.invalid){
      this.cargando = false;
      return;
    }

    let techType = Object.keys(this.form.controls)
      .reduce(
        (prevValue: any, control) => {
          prevValue[control] = this.form.get(control)?.value;
          return prevValue;
        },
        {}
      );

    this.store.dispatch(saveTechsTypes({techType}));

    const operationState$ = this.store.select(selectTechTypesOperationState);

    this.saved = operationState$
      .subscribe(
        (value) => {
          if(value === "error"){
            this.cargando = false;
          }else if(value === "success"){
            this.cancelar();
          }

        }
      );
  }

}
