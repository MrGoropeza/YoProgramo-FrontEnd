import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienciaComponent } from './experiencia.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { StoreModule } from '@ngrx/store';
import * as fromExp from './state/exp.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ExpEffects } from './state/exp.effects';

const routes: Routes = [
  {
    path: "",
    component: ExperienciaComponent
  }
];

@NgModule({
  declarations: [
    ExperienciaComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromExp.expFeatureKey, fromExp.reducer),
    EffectsModule.forFeature([ExpEffects]),
  ],
})
export class ExperienciaModule { }
