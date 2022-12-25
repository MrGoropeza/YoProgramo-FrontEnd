import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: "",
    component: PublicComponent,
    children: [
      {
        path: "inicio",
        pathMatch: "full",
        title: "Inicio",
        loadChildren: () => import('./page-landing/page-landing.module').then(m => m.PageLandingModule),
      },
      {
        path: "experiencia",
        title: "Experiencia",
        loadChildren: () => import('./experiencia/experiencia.module').then(m => m.ExperienciaModule),
      },
    ]
  },
  {
    path: "**",
    redirectTo: "inicio"
  }
];

@NgModule({
  declarations: [
    PublicComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ]
})
export class PublicModule { }
