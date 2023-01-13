import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCrudComponent } from './person-crud.component';
import { PersonFormComponent } from './person-form/person-form.component';
import { EffectsModule } from '@ngrx/effects';
import { PersonEffects } from './state/person.effects';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PersonCrudComponent,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([PersonEffects]),
  ]
})
export class PersonCrudModule { }
