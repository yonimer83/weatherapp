import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FutureComponent } from './future/future.component';
import { WeatherComponent } from './weather.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: WeatherComponent },
  { path: 'days/:num', component: WeatherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
