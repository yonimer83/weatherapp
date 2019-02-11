import { Component, OnInit } from '@angular/core';
import { WeatherService, IWeatherCond } from '../services/weather.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  forecast: IWeatherCond;
//  period: number;

  constructor(private service: WeatherService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
  }

}
