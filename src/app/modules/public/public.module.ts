import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TerminalModule } from './terminal/terminal.module';
import { SecuredModule } from '../secured/secured.module';
import { LoginModule } from './login/login.module';

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
      {
        path: 'educacion',
        title: 'Educación',
        loadChildren: () =>
          import('./education/education.module').then(
            (m) => m.EducationModule
          ),
      },
      {
        path: 'habilidades',
        title: 'Habilidades',
        loadChildren: () =>
          import('./skill/skill.module').then(
            (m) => m.SkillModule
          ),
      },
      {
        path: 'proyectos',
        title: 'Proyectos',
        loadChildren: () =>
          import('./project/project.module').then(
            (m) => m.ProjectModule
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
    SecuredModule,
    LoginModule
  ],
  providers: [MessageService, ConfirmationService],
})
export class PublicModule {}
