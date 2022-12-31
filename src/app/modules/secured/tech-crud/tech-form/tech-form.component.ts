import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, Observable } from 'rxjs';
import { selectTechTypesInicio } from 'src/app/modules/public/page-landing/state/inicio.selectors';
import { Tech } from 'src/app/project/models/Tech.model';
import { TechType } from 'src/app/project/models/TechType.model';
import { CrudFormComponent } from 'src/core/classes/crud-form-component';
import { saveTechs } from '../state/tech.actions';
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
      tipo: [null, Validators.required],
      isLink: [false],
    });
  }

  files: File[] = [];

  ngOnInit(): void {
    this.init();
    if(this.form.controls["imageUrl"].value){
      this.form.controls["isLink"].setValue(true);
    }
    const tiposRequest = this.store.select(selectTechTypesInicio);
    this.tipos = tiposRequest.pipe(
      map(response => response.data)
    );
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  tipos!: Observable<TechType[]>;

  guardar(){
    console.log(this.files);
    this.cargando = true;
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.cargando = false;
      return;
    }

    let tech: Tech = {
      id: this.form.controls["id"].value,
      name: this.form.controls["name"].value,
      imageUrl: this.form.controls["imageUrl"].value ?? null,
      description: this.form.controls["description"].value,
      tipo: this.form.controls["tipo"].value,
    } as Tech;

    
    if(this.files.length > 0){
      tech = {...tech, imageFile: this.files[0]}
    }

    this.store.dispatch(saveTechs({tech}));
    

    this.savedValue();
  }

}
