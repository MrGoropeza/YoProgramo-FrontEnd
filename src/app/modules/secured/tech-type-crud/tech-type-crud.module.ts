import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechTypeCrudComponent } from './tech-type-crud.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { StoreModule } from '@ngrx/store';

import * as fromTechType from './state/techs-type.reducer';

@NgModule({
  declarations: [
    TechTypeCrudComponent
  ],
  exports: [
    TechTypeCrudComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    StoreModule.forFeature(
      fromTechType.techsTypeFeatureKey,
      fromTechType.techTypeCrudReducer
    ),
  ]
})
export class TechTypeCrudModule { }
