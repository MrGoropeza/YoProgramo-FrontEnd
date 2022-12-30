import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tech } from '../models/Tech.model';

@Injectable({
  providedIn: 'root',
})
export class TechnologiesService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  dummieFrontTechs = [
    {
      id: 1,
      name: 'Angular',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      description: 'Framework Frontend',
    } as Tech,
    {
      id: 2,
      name: 'Tailwind CSS',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png',
      description: 'Framework CSS',
    } as Tech,
    {
      id: 3,
      name: 'PrimeNG',
      imageUrl:
        'https://i0.wp.com/www.primefaces.org/wp-content/uploads/2018/05/primeng-logo.png?ssl=1',
      description: 'Librería de Componentes para Angular',
    } as Tech,
    {
      id: 4,
      name: 'RxJS',
      imageUrl:
        'https://rxjs.dev/generated/images/marketing/home/Rx_Logo-512-512.png',
      description: 'Librería de JavaScript para programación reactiva',
    } as Tech,
    // {
    //   id: 5,
    //   name: 'NgRx',
    //   imageUrl: 'https://ngrx.io/assets/images/badge.svg',
    //   description: 'Librería para utilizar el patrón Redux en Angular',
    // } as TechModel,
  ];


}
