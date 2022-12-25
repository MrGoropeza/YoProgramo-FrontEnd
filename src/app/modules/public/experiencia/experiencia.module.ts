import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienciaComponent } from './experiencia.component';
import { RouterModule, Routes } from '@angular/router';

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
     RouterModule.forChild(routes),
  ]
})
export class ExperienciaModule { }
