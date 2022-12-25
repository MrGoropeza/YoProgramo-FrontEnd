import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLandingComponent } from './page-landing.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { HeaderComponent } from './components/header/header.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TecnologiasComponent } from './components/tecnologias/tecnologias.component';
import { MenuComponent } from './components/menu/menu.component';

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
    HeaderComponent,
    TecnologiasComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ]
})
export class PageLandingModule { }
