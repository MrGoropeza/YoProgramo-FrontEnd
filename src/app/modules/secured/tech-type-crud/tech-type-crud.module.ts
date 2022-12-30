import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import TechTypeCrudComponent from './tech-type-crud.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { StoreModule } from '@ngrx/store';

import * as fromTechType from './state/techs-type.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TechTypeEffects } from './state/techs-type.effects';
import { TechTypeFormComponent } from './tech-type-form/tech-type-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TechTypeCrudComponent,
    TechTypeFormComponent
  ],
  exports: [
    TechTypeCrudComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromTechType.techsTypeFeatureKey,
      fromTechType.techTypeCrudReducer
    ),
    EffectsModule.forFeature(TechTypeEffects),
  ],
})
export class TechTypeCrudModule { }
