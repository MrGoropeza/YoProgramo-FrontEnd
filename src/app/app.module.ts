import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig, defaultDataServiceConfig } from './entity-metadata';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictActionImmutability: false
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EntityDataModule.forRoot(entityConfig)
  ],
  providers: [{provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig}, DialogService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
