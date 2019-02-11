import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService, ILocation } from '../services/weather.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { fromEvent, Subject, Observable, from, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  location = '';
  input$ = new Subject<string>();
  suggestions$: Observable<ILocation[]>;
  selectedLocation = false;

  constructor(private service: WeatherService) {}

  ngOnInit() {
    const currentInput = this.input$.asObservable();
    this.suggestions$ = this.input$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(t => {
          if (!t) {
            return from([]);
          } else {
            return this.service.searchLocation(t);
          }
        }),
    );

    fromEvent(document, 'click').subscribe(e => {
      if (!this.selectedLocation) {
        this.input$.next('');
        this.location = '';
      }
    });
  }
  selectSuggestion(event, suggestionName) {
    this.selectedLocation = true;
    this.location = suggestionName;
  }

  search(term: string) {
    if (!term.length) {
      this.selectedLocation = false;
    } else {
      this.input$.next(term);
      this.location = term;
  }
}

  onSubmit(e, keyword) {
    e.preventDefault();
    this.service.changeLocation(keyword);
    this.location = '';
  }
}
