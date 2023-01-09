import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import * as fromEducation from './state/education.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ExpEffects } from '../experiencia/state/exp.effects';

const routes: Routes = [
  {
    path: '',
    component: EducationComponent
  }
];

@NgModule({
  declarations: [
    EducationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    StoreModule.forFeature(fromEducation.educationFeatureKey, fromEducation.reducer),
    EffectsModule.forFeature([ExpEffects]),
  ]
})
export class EducationModule { }
