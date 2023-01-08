import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienciaComponent } from './experiencia.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: "",
    component: ExperienciaComponent
  }
];

@NgModule({
  declarations: [
    ExperienciaComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
})
export class ExperienciaModule { }
