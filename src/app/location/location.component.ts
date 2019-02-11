import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {
  @Input() location: string;
  locationSubscr: Subscription;
  saved = false;
  constructor(private service: WeatherService) {}

  ngOnInit() {
    this.locationSubscr = this.service.currentLocation.subscribe(location => {
      this.location = location;
      this.saved = this.service.locationSaved(this.location);
     });

  }
  saveLocation(e) {
    this.service.addSearchLocation(this.location);
    this.saved = true;
  }

  ngOnDestroy() {
    this.locationSubscr.unsubscribe();
  }
}
