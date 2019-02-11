import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { TempunitComponent } from './tempunit/tempunit.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent } from './location/location.component';
import { LastSearchedComponent } from './last-searched/last-searched.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TempunitComponent,
    LocationComponent,
    LastSearchedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
