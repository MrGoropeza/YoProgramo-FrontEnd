import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';
import { esLanguage } from 'src/core/consts/esLanguage';
import { ThemeService } from 'src/core/services/theme.service';
import { StateService } from './project/services/state.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private primengConfig: PrimeNGConfig,
    private themeService: ThemeService,
    private stateService: StateService,
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation(esLanguage);
    this.themeService.setOSTheme();
  }
  
}
