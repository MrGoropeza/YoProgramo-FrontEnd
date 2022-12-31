import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechCrudComponent } from './tech-crud.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { StoreModule } from '@ngrx/store';

import * as fromTechs from './state/tech.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TechEffects } from './state/tech.effects';
import { TechFormComponent } from './tech-form/tech-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TechCrudComponent, TechFormComponent],
  exports: [TechCrudComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(
      fromTechs.techFeatureKey,
      fromTechs.techReducer
    ),
    EffectsModule.forFeature([TechEffects]),
  ],
})
export class TechCrudModule {}
