import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';

import { CurrentComponent } from './current/current.component';
import { FutureComponent } from './future/future.component';
import { WeatherComponent } from './weather.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CurrentComponent, FutureComponent, WeatherComponent],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    SharedModule,
  ]
})
export class WeatherModule { }
