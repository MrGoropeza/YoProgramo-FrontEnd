import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadInicios } from './state/inicio.actions';

@Component({
  selector: 'app-page-landing',
  templateUrl: './page-landing.component.html',
  styleUrls: ['./page-landing.component.scss']
})
export class PageLandingComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadInicios());
  }

}
