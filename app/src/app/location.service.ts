import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../environments/environment';
import { TestBed } from '@angular/core/testing';
import { Location, LocationDetails } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  baseUrl: string;

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiBaseUrl;
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/locations`)
  }

  getLocation(locationId: number): Observable<LocationDetails> {
    return this.http.get<LocationDetails>(`${this.baseUrl}/locations/${locationId}`);
  }

  deleteLocation(locationId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/locations/${locationId}`);
  }

}