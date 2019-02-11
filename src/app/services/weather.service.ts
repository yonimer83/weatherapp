import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
export interface ICondition {
  icon?: string;
  text?: string;
}
export interface ICurrent {
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  temp_c: number;
  temp_f: number;
  wind_degree: number;
  wind_dir: string;
  wind_kph: number;
  condition: ICondition;
}
export interface ILocation {
  country: string;
  name: string;
  region: string;
}
export interface IForecast {
  forecastday: object[];
}
export interface IWeatherCond {
  current?: ICurrent;
  location?: ILocation;
  forecast?: IForecast;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  tempUnit = new BehaviorSubject<string>('C');
  rootURI = 'http://api.apixu.com/v1/';
  current_endpoint = 'current.json?';
  forecast_endpoint = 'forecast.json?';
  search_endpoint = 'search.json?';
  APIkey = '***'; //  &q=sofia&days=10
  location = new BehaviorSubject<string>('Sofia');
  // default to Sofia
  lat = 42.70;
  lon = 23.32;
  searchedLocations$ = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    const loc = navigator.geolocation.getCurrentPosition(pos => {
      this.lat = pos.coords.latitude;
      this.lon = pos.coords.longitude;
    });
  }

  currentTempUnit = this.tempUnit.asObservable();
  currentLocation = this.location.asObservable();
  currentSearchedLocations = this.searchedLocations$.asObservable();

  changeTempUnit(value) {
    this.tempUnit.next(value);
  }
  changeLocation(loc) {
    this.location.next(loc);
  }
  getByInitialLocation(): Observable<IWeatherCond> { // by latitude and longitude
    return this.http.get<IWeatherCond>(
      this.rootURI +
        this.current_endpoint +
        'key=' +
        this.APIkey +
        '&q=' +
        this.lat +
        ',' +
        this.lon
    );
  }
  getCurrentWeather(location): Observable<IWeatherCond> { // current weather by location
    return this.http.get<IWeatherCond>(
      this.rootURI +
        this.current_endpoint +
        'key=' +
        this.APIkey +
        '&q=' +
        location
    );
  }
  getFutureWeather(location, period): Observable<IWeatherCond> {
    return this.http.get<IWeatherCond>(
      this.rootURI +
        this.forecast_endpoint +
        'key=' +
        this.APIkey +
        '&q=' +
        location +
        '&days=' +
        period
    );
  }
  searchLocation(location): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(
      this.rootURI +
        this.search_endpoint +
        'key=' +
        this.APIkey +
        '&q=' +
        location
    );
  }
  addSearchLocation(location: string) {
    const savedLocations = JSON.parse(localStorage.getItem('searchedLocations'));
      if (savedLocations && (savedLocations as string[]).indexOf(location) === -1) { // location not added
      savedLocations.push(location);
      }
    localStorage.setItem('searchedLocations', JSON.stringify(savedLocations));
    this.searchedLocations$.next(savedLocations);
  }
  getSavedLocations() {
    const locations = JSON.parse(localStorage.getItem('searchedLocations'));
    this.searchedLocations$.next(locations);
  }
  removeLocation(location) {
    const savedLocations = JSON.parse(localStorage.getItem('searchedLocations'));
    const updatedLocations = savedLocations.filter( item =>
      item !== location
    );
    localStorage.setItem('searchedLocations', JSON.stringify(updatedLocations));
    this.searchedLocations$.next(updatedLocations);
  }
  locationSaved(location: string): boolean {
    const savedLocations = JSON.parse(localStorage.getItem('searchedLocations'));
    if (savedLocations) {
      return savedLocations.indexOf(location) > -1;
    }
    return false;
  }

}
