import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecnologia, TipoTecnologia } from '../models/tech.model';

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
    } as Tecnologia,
    {
      id: 2,
      name: 'Tailwind CSS',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png',
      description: 'Framework CSS',
    } as Tecnologia,
    {
      id: 3,
      name: 'PrimeNG',
      imageUrl:
        'https://i0.wp.com/www.primefaces.org/wp-content/uploads/2018/05/primeng-logo.png?ssl=1',
      description: 'Librería de Componentes para Angular',
    } as Tecnologia,
    {
      id: 4,
      name: 'RxJS',
      imageUrl:
        'https://rxjs.dev/generated/images/marketing/home/Rx_Logo-512-512.png',
      description: 'Librería de JavaScript para programación reactiva',
    } as Tecnologia,
    // {
    //   id: 5,
    //   name: 'NgRx',
    //   imageUrl: 'https://ngrx.io/assets/images/badge.svg',
    //   description: 'Librería para utilizar el patrón Redux en Angular',
    // } as TechModel,
  ];

  techsCharged$ = new BehaviorSubject(false);

  createDummieTechs() {
    const requests: Observable<any>[] = [];

    this.dummieFrontTechs.forEach((tech) => {
      tech.tipo = { id: 1 } as TipoTecnologia;

      const form = new FormData();
      form.append('tech', JSON.stringify(tech));

      requests.push(
        this.http.post(`${this.apiUrl}/techs/create`, form, {
          observe: 'response',
        })
      );
    });

    this.http
      .post(
        `${this.apiUrl}/tipoTecnologia/create`,
        {
          id: 1,
          name: 'Frontend',
        },
        {
          observe: 'response',
        }
      )
      .subscribe(() => {
        combineLatest(requests).subscribe((value) => {
          if (value.every((response) => response.status === 200)) {
            this.techsCharged$.next(true);
          }
        });
      });
  }

  getTechTypes(){
    return this.http.get<TipoTecnologia[]>(`${this.apiUrl}/tipoTecnologia/list`);
  }

  getTechs(techTypeName: string){
    return this.http.get<Tecnologia[]>(`${this.apiUrl}/techs/list`, {
      params: {
        tipo: techTypeName,
      },
    });
  }

}
