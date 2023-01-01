import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechCrudComponent } from './tech-crud.component';
import { ComponentsModule } from 'src/app/components/components.module';
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
    EffectsModule.forFeature([TechEffects]),
  ],
})
export class TechCrudModule {}
