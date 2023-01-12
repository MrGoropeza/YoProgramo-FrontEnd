import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillComponent } from './skill.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { StoreModule } from '@ngrx/store';
import * as fromSkill from './state/skill.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SkillEffects } from './state/skill.effects';

const routes: Routes = [
  {
    path: "",
    component: SkillComponent
  }
];

@NgModule({
  declarations: [
    SkillComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    StoreModule.forFeature(fromSkill.skillFeatureKey, fromSkill.reducer),
    EffectsModule.forFeature([SkillEffects])
  ]
})
export class SkillModule { }
