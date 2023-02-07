import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/project/services/auth.service';
import { StateService } from 'src/app/project/services/state.service';
import {
  TerminalLoginCommand,
  TerminalLogoutCommand,
  TerminalOpenCommand,
} from './terminal/state/terminal.actions';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      routerLink: ['/inicio'],
    },
    {
      label: 'Experiencia',
      routerLink: ['/experiencia'],
    },
    {
      label: 'Educación',
      routerLink: ['/educacion'],
    },
    {
      label: 'Habilidades',
      routerLink: ['/habilidades'],
    },
    {
      label: 'Proyectos',
      routerLink: ['/proyectos'],
    },
  ];

  dialItems: MenuItem[] = [
    {
      icon: 'pi pi-user',
      tooltipOptions: {
        tooltipLabel: 'Editar Datos Personales',
        tooltipPosition: 'left',
      },
      command: () =>
        this.store.dispatch(
          this.stateService.getState('About').actions.openCrudForm({})
        ),
    },
    {
      icon: 'bi bi-database-gear',
      tooltipOptions: {
        tooltipLabel: 'Editar Tecnologías',
        tooltipPosition: 'left',
      },
      command: () =>
        this.store.dispatch(
          this.stateService.getState('Tech').actions.openCrudDialog()
        ),
    },
    {
      icon: 'bi bi-gear',
      tooltipOptions: {
        tooltipLabel: 'Editar Tipos de Tecnología',
        tooltipPosition: 'left',
      },
      command: () =>
        this.store.dispatch(
          this.stateService.getState('TechType').actions.openCrudDialog()
        ),
    },
    {
      icon: 'bi bi-buildings',
      tooltipOptions: {
        tooltipLabel: 'Editar Lugares',
        tooltipPosition: 'left',
      },
      command: () =>
        this.store.dispatch(
          this.stateService.getState('Place').actions.openCrudDialog()
        ),
    },
    {
      icon: 'bi bi-trophy',
      tooltipOptions: {
        tooltipLabel: 'Editar Experiencias Laborales',
        tooltipPosition: 'left',
      },
      command: () =>
        this.store.dispatch(
          this.stateService.getState('Experience').actions.openCrudDialog()
        ),
    },
    {
      icon: 'bi bi-mortarboard',
      tooltipOptions: {
        tooltipLabel: 'Editar Educaciones',
        tooltipPosition: 'left',
      },
      command: () =>
        this.store.dispatch(
          this.stateService.getState('Education').actions.openCrudDialog()
        ),
    },
    {
      icon: 'bi bi-tools',
      tooltipOptions: {
        tooltipLabel: 'Editar Habilidades',
        tooltipPosition: 'left',
      },
      command: () =>
        this.store.dispatch(
          this.stateService.getState('Skill').actions.openCrudDialog()
        ),
    },
    {
      icon: 'bi bi-people',
      tooltipOptions: {
        tooltipLabel: 'Editar Personas',
        tooltipPosition: 'left',
      },
      command: () =>
        this.store.dispatch(
          this.stateService.getState('Person').actions.openCrudDialog()
        ),
    },
    {
      icon: 'bi bi-lightbulb',
      tooltipOptions: {
        tooltipLabel: 'Editar Proyectos',
        tooltipPosition: 'left',
      },
      command: () =>
        this.store.dispatch(
          this.stateService.getState('Project').actions.openCrudDialog()
        ),
    },
  ];

  constructor(
    private store: Store,
    protected authService: AuthService,
    private stateService: StateService
  ) {}

  openTerminal() {
    this.store.dispatch(TerminalOpenCommand());
  }

  signin() {
    this.store.dispatch(TerminalLoginCommand());
  }

  signout() {
    this.store.dispatch(TerminalLogoutCommand());
  }
}
