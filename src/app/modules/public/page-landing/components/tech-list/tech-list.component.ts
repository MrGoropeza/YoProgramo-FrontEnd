import { Component, Input, OnInit } from '@angular/core';
import { Tecnologia } from 'src/app/project/models/tech.model';

@Component({
  selector: 'app-tech-list',
  templateUrl: './tech-list.component.html',
  styleUrls: ['./tech-list.component.scss']
})
export class TechListComponent implements OnInit {

  @Input() title!: string;
  @Input() techs!: Tecnologia[];

  constructor() { }

  ngOnInit(): void {
  }

}
