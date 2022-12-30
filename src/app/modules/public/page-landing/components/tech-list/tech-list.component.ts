import { Component, Input, OnInit } from '@angular/core';
import { Tech } from 'src/app/project/models/Tech.model';

@Component({
  selector: 'app-tech-list',
  templateUrl: './tech-list.component.html',
  styleUrls: ['./tech-list.component.scss']
})
export class TechListComponent implements OnInit {

  @Input() title!: string;
  @Input() techs!: Tech[];

  constructor() { }

  ngOnInit(): void {
  }

}
