import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './state/project.effects';
import { StoreModule } from '@ngrx/store';
import * as fromProject from './state/project.reducer';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: ProjectComponent
  }
];

@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([ProjectEffects]),
    StoreModule.forFeature(fromProject.projectFeatureKey, fromProject.reducer)
  ]
})
export class ProjectModule { }
