import { Component, OnInit } from '@angular/core';

import { PrimeNGConfig } from 'primeng/api';
import { esLanguage } from 'src/core/consts/esLanguage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.primengConfig.setTranslation(esLanguage);
    }
  
}
