import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationCrudComponent } from './education-crud.component';
import { EducationFormComponent } from './education-form/education-form.component';
import { EffectsModule } from '@ngrx/effects';
import { EducationCrudEffects } from './state/education-crud.effects';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EducationCrudComponent,
    EducationFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([EducationCrudEffects])
  ]
})
export class EducationCrudModule { }
