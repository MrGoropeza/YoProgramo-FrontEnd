import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Person } from 'src/app/project/models/Person.model';
import { StateService } from 'src/app/project/services/state.service';
import { NOIMAGELINK } from 'src/core/consts/no-image';
import { selectAboutMeInfo } from '../../state/inicio.selectors';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private stateService: StateService) {}

  aboutMeInfo$!: Observable<Person>;
  aboutMeSub$!: Subscription;

  noImageLink = NOIMAGELINK;

  ngOnInit(): void {
    this.aboutMeInfo$ = this.store.select(selectAboutMeInfo);
  }

  ngOnDestroy(): void {
    if (this.aboutMeSub$) {
      this.aboutMeSub$.unsubscribe();
    }
  }
}
