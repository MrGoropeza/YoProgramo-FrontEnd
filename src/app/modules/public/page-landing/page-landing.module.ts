import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLandingComponent } from './page-landing.component';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TecnologiasComponent } from './components/tecnologias/tecnologias.component';
import { TechListComponent } from './components/tech-list/tech-list.component';
import { StoreModule } from '@ngrx/store';
import * as fromInicio from './state/inicio.reducer';
import { EffectsModule } from '@ngrx/effects';
import { InicioEffects } from './state/inicio.effects';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

const routes: Routes = [
  {
    path: '',
    component: PageLandingComponent,
  },
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
    ComponentsModule,
    StoreModule.forFeature(fromInicio.inicioFeatureKey, fromInicio.reducer),
    EffectsModule.forFeature([
      InicioEffects,
    ]),
  ],
  providers: [DialogService, ConfirmationService],
})
export class PageLandingModule {}
