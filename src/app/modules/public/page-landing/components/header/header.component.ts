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
      routerLink: ["/"],
    },
    {
      label: "Experiencia",
      routerLink: ["/experiencia"],
    },
    {
      label: "Educación",
      routerLink: ["/educacion"],
    },
    {
      label: "Habilidades",
      routerLink: ["/habilidades"],
    },
    {
      label: "Proyectos",
      routerLink: ["/proyectos"],
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
