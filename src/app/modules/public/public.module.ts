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
        path: "",
        loadChildren: () => import('./page-landing/page-landing.module').then(m => m.PageLandingModule),
      },
      {
        path: "experiencia",
        loadChildren: () => import('./experiencia/experiencia.module').then(m => m.ExperienciaModule),
      },
    ]
  },
  {
    path: "**",
    redirectTo: ""
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
