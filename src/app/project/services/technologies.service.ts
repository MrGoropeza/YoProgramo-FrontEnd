import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { TechModel } from '../models/tech.model';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {

  getBackendTechs() {
    return of([
      {
        id: 'a',
        name: 'SpringBoot',
        imageUrl:
          'https://dz2cdn1.dzone.com/storage/temp/12434118-spring-boot-logo.png',
        description: 'Framework Backend',
      } as TechModel,
    ]);
  }

  getFrontendTechs() {
    return of([
      {
        id: 'a',
        name: 'Angular',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
        description: 'Framework Frontend',
      } as TechModel,
      {
        id: 'a',
        name: 'Tailwind CSS',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png',
        description: 'Framework CSS',
      } as TechModel,
      {
        id: 'a',
        name: 'PrimeNG',
        imageUrl:
          'https://i0.wp.com/www.primefaces.org/wp-content/uploads/2018/05/primeng-logo.png?ssl=1',
        description: 'Librería de Componentes para Angular',
      } as TechModel,
      {
        id: 'a',
        name: 'RxJS',
        imageUrl:
          'https://rxjs.dev/generated/images/marketing/home/Rx_Logo-512-512.png',
        description: 'Librería de JavaScript para programación reactiva',
      } as TechModel,
      {
        id: 'a',
        name: 'NgRx',
        imageUrl: 'https://ngrx.io/assets/images/badge.svg',
        description: 'Librería para utilizar el patrón Redux en Angular',
      } as TechModel,
    ]);
  }
}
