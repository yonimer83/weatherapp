import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService, IWeatherCond } from './services/weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Weather';
  weatherCond: IWeatherCond;
  location: string;
  locationSubscr: Subscription;
  constructor( private service: WeatherService) {
  }

  ngOnInit() {
    // get location by browser navigator geolocation
    this.locationSubscr = this.service.getByInitialLocation().subscribe(data => {
      this.weatherCond = data;
      this.location = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
      this.service.changeLocation(this.location);
    });
  }
  ngOnDestroy() {
    this.locationSubscr.unsubscribe();
  }
}
