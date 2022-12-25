import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      label: "Inicio",
    },
    {
      label: "Experiencia",
    },
    {
      label: "Educación",
    },
    {
      label: "Habilidades",
    },
    {
      label: "Proyectos",
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
