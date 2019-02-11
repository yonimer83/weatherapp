import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-last-searched',
  templateUrl: './last-searched.component.html',
  styleUrls: ['./last-searched.component.scss']
})
export class LastSearchedComponent implements OnInit {
searches: Observable<string[]>;

  constructor(private service: WeatherService) { }

  ngOnInit() {
    this.service.getSavedLocations();
    this.searches = this.service.currentSearchedLocations;
  }
  removeSearch(e, location) {
    this.service.removeLocation(location);
  }
  loadSearch(e, location) {
    return this.service.changeLocation(location);
  }
}
