import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AboutModel } from 'src/app/project/models/about.model';
import { selectAboutMeInfo } from '../../state/inicio.selectors';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  aboutMeInfo$!: Observable<AboutModel>;

  ngOnInit(): void {
    this.aboutMeInfo$ = this.store.select(selectAboutMeInfo);
  }
}
