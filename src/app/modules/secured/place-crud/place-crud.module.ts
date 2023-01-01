import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaceCrudComponent } from './place-crud.component';
import { PlaceFormComponent } from './place-form/place-form.component';
import { EffectsModule } from '@ngrx/effects';
import { PlaceEffects } from './state/place.effects';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PlaceCrudComponent,
    PlaceFormComponent
  ],
  exports: [
    PlaceCrudComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([PlaceEffects])
  ]
})
export class PlaceCrudModule { }
