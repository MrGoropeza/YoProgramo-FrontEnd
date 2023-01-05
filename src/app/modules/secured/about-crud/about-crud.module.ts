import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutCrudComponent } from './about-crud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { EffectsModule } from '@ngrx/effects';
import { AboutEffects } from './state/about.effects';



@NgModule({
  declarations: [
    AboutCrudComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    EffectsModule.forFeature([AboutEffects]),
  ]
})
export class AboutCrudModule { }
