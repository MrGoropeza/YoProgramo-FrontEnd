import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AboutModel } from '../models/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutMeService {
  getAboutMeInfo(): Observable<AboutModel> {
    return of({
      name: 'Gonzalo Oropeza',
      nameUrl: 'https://www.linkedin.com/in/gonzalo-oropeza-6170a717b/',
      imageUrl: 'assets/images/yo.jpg',
      title: 'Full Stack Developer Jr',
      actualWork: {
        imageUrl: 'assets/images/siltium.jpg',
        name: 'Siltium',
        url: 'https://www.linkedin.com/company/siltium/',
      },
      actualCareer: {
        imageUrl: 'assets/images/ucasal.png',
        name: 'Ing. en Informática',
        url: 'https://www.ucasal.edu.ar/carrera/nivel/carreras-grado/ingenieria-informatica/',
      },
    } as AboutModel);
  }
}
