import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tecnologias',
  templateUrl: './tecnologias.component.html',
  styleUrls: ['./tecnologias.component.scss']
})
export class TecnologiasComponent implements OnInit {

  frontEndTechs = [1,1,1,1,1,1,1];
  backEndTechs = [1,1,1,1,1,1,1];

  constructor() { }

  ngOnInit(): void {
  }

}
