import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCrudComponent } from './project-crud.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './state/project.effects';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProjectCrudComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ProjectEffects])
  ]
})
export class ProjectCrudModule { }
