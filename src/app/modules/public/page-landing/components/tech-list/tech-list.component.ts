import { Component, Input } from '@angular/core';
import { Tech } from 'src/app/project/models/Tech.model';

@Component({
  selector: 'app-tech-list',
  templateUrl: './tech-list.component.html',
  styleUrls: ['./tech-list.component.scss'],
})
export class TechListComponent {
  @Input() techs: Tech[] = [];
}
