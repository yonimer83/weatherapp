import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { from } from 'rxjs';
import { WeatherService } from '../services/weather.service';


@Component({
  selector: 'app-tempunit',
  templateUrl: './tempunit.component.html',
  styleUrls: ['./tempunit.component.scss']
})
export class TempunitComponent implements OnInit {
@ViewChild('tempUnit') tempUnit: ElementRef;

constructor(private service: WeatherService) { }

  ngOnInit() {
  }

  changeTempUnit(e) {
    this.service.changeTempUnit(e.target.value);
    // console.log('service temp unit changed', this.service.currentTempUnit);
  }
}
