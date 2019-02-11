import { Component, OnInit, OnDestroy } from '@angular/core';
import { WeatherService, IWeatherCond } from '../../services/weather.service';
import { Observable, Subscription } from 'rxjs';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit, OnDestroy {
  weatherCond: IWeatherCond;
  tempUnit: Observable<string>;
  location = '';
  currWeatherSubscr: Subscription;
  locationSubscr: Subscription;
  constructor(private service: WeatherService) { }

  ngOnInit() {
    this.tempUnit = this.service.currentTempUnit;

    this.locationSubscr = this.service.currentLocation.subscribe(
      location => {
        this.location = location;
        this.currWeatherSubscr = this.service.getCurrentWeather(this.location).subscribe(d => {
          this.weatherCond = d;
        });

      }
    );
  }
  ngOnDestroy(): void {
    this.locationSubscr.unsubscribe();
    this.currWeatherSubscr.unsubscribe();
  }

}
