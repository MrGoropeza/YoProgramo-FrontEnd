import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechCrudComponent } from './tech-crud.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { StoreModule } from '@ngrx/store';

import * as fromTechs from './state/tech.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TechEffects } from './state/tech.effects';

@NgModule({
  declarations: [TechCrudComponent],
  exports: [TechCrudComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    StoreModule.forFeature(
      fromTechs.techFeatureKey,
      fromTechs.techReducer
    ),
    EffectsModule.forFeature([TechEffects]),
  ],
})
export class TechCrudModule {}
