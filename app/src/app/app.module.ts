import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationsComponent } from './locations/locations.component';
import { LocationEditComponent } from './location-edit/location-edit.component';
import { NestDetailsComponent } from './nest-details/nest-details.component';
import { NestEditComponent } from './nest-edit/nest-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationDetailsComponent,
    LocationsComponent,
    LocationEditComponent,
    NestDetailsComponent,
    NestEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
