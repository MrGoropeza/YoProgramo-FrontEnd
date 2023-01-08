import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { TerminalOpenCommand } from './terminal/state/terminal.actions';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent {

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

  constructor(
    private store: Store
  ) { }

  openTerminal(){
    this.store.dispatch(TerminalOpenCommand());
  }

}
