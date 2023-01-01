import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienciaComponent } from './experiencia.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlaceCrudModule } from '../../secured/place-crud/place-crud.module';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

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
    PlaceCrudModule,
    RouterModule.forChild(routes),
  ],
  providers: [DialogService, ConfirmationService],
})
export class ExperienciaModule { }
