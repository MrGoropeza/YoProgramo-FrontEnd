import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/project/services/state.service';
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {

  constructor(
    private stateService: StateService,
    private store: Store
  ) { }

  ngOnInit(): void {
  }

}
