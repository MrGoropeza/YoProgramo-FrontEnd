import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TerminalModule } from './terminal/terminal.module';
import { PlaceCrudModule } from '../secured/place-crud/place-crud.module';
import { AboutCrudModule } from '../secured/about-crud/about-crud.module';
import { TechCrudModule } from '../secured/tech-crud/tech-crud.module';
import { TechTypeCrudModule } from '../secured/tech-type-crud/tech-type-crud.module';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'inicio',
      },
      {
        path: 'inicio',
        title: 'Inicio',
        loadChildren: () =>
          import('./page-landing/page-landing.module').then(
            (m) => m.PageLandingModule
          ),
      },
      {
        path: 'experiencia',
        title: 'Experiencia',
        loadChildren: () =>
          import('./experiencia/experiencia.module').then(
            (m) => m.ExperienciaModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    TerminalModule,
    TechTypeCrudModule,
    TechCrudModule,
    AboutCrudModule,
    PlaceCrudModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class PublicModule {}
