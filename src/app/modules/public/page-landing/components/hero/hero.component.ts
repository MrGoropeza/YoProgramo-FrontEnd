import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AboutModel } from 'src/app/project/models/about.model';
import { selectAboutMeInfo } from '../../selectors/inicio.selectors';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  aboutMeInfo$!: Observable<AboutModel>;

  ngOnInit(): void {
    this.aboutMeInfo$ = this.store.select(selectAboutMeInfo);
  }

  goToPersonalPage(){
    window.open("https://www.linkedin.com/in/gonzalo-oropeza-6170a717b/", "_blank");
  }

  goToCareer(){
    window.open("https://www.ucasal.edu.ar/carrera/nivel/carreras-grado/ingenieria-informatica/", "_blank");
  }

  goToWork(){
    window.open("https://www.linkedin.com/company/siltium/", "_blank");
  }
}
