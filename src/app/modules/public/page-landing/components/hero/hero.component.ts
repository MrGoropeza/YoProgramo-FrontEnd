import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Person } from 'src/app/project/models/Person.model';
import { StateService } from 'src/app/project/services/state.service';
import { NOIMAGELINK } from 'src/core/consts/no-image';
import * as InicioSelectors from '../../state/inicio.selectors';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit {
  constructor(private store: Store, private stateService: StateService) {}

  aboutMeInfo$!: Observable<Person>;
  aboutLoading$!: Observable<boolean>;
  noImageLink = NOIMAGELINK;

  ngOnInit(): void {
    this.aboutMeInfo$ = this.store.select(InicioSelectors.selectAboutMeInfo);
    this.aboutLoading$ = this.store.select(InicioSelectors.selectAboutLoading);
  }
}
