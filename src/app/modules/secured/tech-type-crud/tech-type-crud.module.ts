import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import TechTypeCrudComponent from './tech-type-crud.component';
import { ComponentsModule } from 'src/app/components/components.module';
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
    EffectsModule.forFeature(TechTypeEffects),
  ],
})
export class TechTypeCrudModule { }
