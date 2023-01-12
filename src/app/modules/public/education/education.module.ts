import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { StoreModule } from '@ngrx/store';
import * as fromEducation from './state/education.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EducationEffects } from './state/education.effects';
import { PrimeComponentsModule } from 'src/app/prime-components.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
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
    PrimeComponentsModule,
    StoreModule.forFeature(fromEducation.educationFeatureKey, fromEducation.reducer),
    EffectsModule.forFeature([EducationEffects])
  ]
})
export class EducationModule { }
