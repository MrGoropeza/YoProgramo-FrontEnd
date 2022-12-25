import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLandingComponent } from './page-landing.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TecnologiasComponent } from './components/tecnologias/tecnologias.component';
import { TechListComponent } from './components/tech-list/tech-list.component';

const routes: Routes = [
  {
    path: "",
    component: PageLandingComponent
  }
];

@NgModule({
  declarations: [
    PageLandingComponent,
    HeroComponent,
    TecnologiasComponent,
    TechListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ]
})
export class PageLandingModule { }
