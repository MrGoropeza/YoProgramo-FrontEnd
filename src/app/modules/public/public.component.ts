import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      label: "Inicio",
      routerLink: ["/inicio"],
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
