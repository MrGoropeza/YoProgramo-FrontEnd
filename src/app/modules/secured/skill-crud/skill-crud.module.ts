import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillCrudComponent } from './skill-crud.component';
import { SkillFormComponent } from './skill-form/skill-form.component';
import { EffectsModule } from '@ngrx/effects';
import { SkillEffects } from './state/skill.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    SkillCrudComponent,
    SkillFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    EffectsModule.forFeature([SkillEffects])
  ]
})
export class SkillCrudModule { }
