import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
