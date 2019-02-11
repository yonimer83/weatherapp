import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IWeatherCond, WeatherService } from '../../services/weather.service';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-future',
  templateUrl: './future.component.html',
  styleUrls: ['./future.component.scss']
})
export class FutureComponent implements OnInit, OnDestroy {

  tempUnit: Observable<string>;
  // @Input() weatherCond: IWeatherCond;
  @Input() period: number;
  forecast: object[];
  location = '';
  tomorrow = false;

  currWeatherSubscr: Subscription;
  futureWeatherSubscr: Subscription;
  constructor(
    private service: WeatherService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tempUnit = this.service.currentTempUnit;

    this.currWeatherSubscr = this.service.currentLocation.subscribe(
      location => {
        this.location = location;
        this.service.getFutureWeather(this.location, this.period)
        .pipe(map(f => f.forecast.forecastday))
        .subscribe(d => {
          this.forecast = d;
          if (this.forecast.length === 2) {
            // to eliminate current day when querying for tomorrow,
            // will hide .tomorrow:first-child
            this.tomorrow = true;
          }
          // console.log('future forecast: ', this.forecast);
        });
      }
    );

  }
  ngOnDestroy(): void {
    if (this.currWeatherSubscr) {
      this.currWeatherSubscr.unsubscribe();
    }
    if (this.futureWeatherSubscr) {
      this.futureWeatherSubscr.unsubscribe();
    }

  }
}
