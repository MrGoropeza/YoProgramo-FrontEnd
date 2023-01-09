import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpCrudComponent } from './exp-crud.component';
import { EffectsModule } from '@ngrx/effects';
import { ExpCrudEffects } from './state/exp-crud.effects';
import { ExpFormComponent } from './exp-form/exp-form.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ExpCrudComponent,
    ExpFormComponent
  ],
  exports: [
    ExpCrudComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ExpCrudEffects])
  ]
})
export class ExpCrudModule { }
