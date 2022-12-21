import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLandingComponent } from './page-landing.component';
import { RouterModule, Routes } from '@angular/router';
import { TerminalModule } from '../../secured/terminal/terminal.module';
import { HeroComponent } from './components/hero/hero.component';
import { HeaderComponent } from './components/header/header.component';

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
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TerminalModule
  ]
})
export class PageLandingModule { }
