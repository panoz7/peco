import { Injectable, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() updated = new EventEmitter<boolean>();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiBaseUrl;
  }

  getLocations(): Promise<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/locations`).toPromise();
  }

  getLocation(locationId: number): Observable<LocationDetails> {
    console.log(`getting location ${locationId}`)
    return this.http.get<LocationDetails>(`${this.baseUrl}/locations/${locationId}`);
  }

  deleteLocation(locationId: number): Promise<any> {
    return this.http.delete<any>(`${this.baseUrl}/locations/${locationId}`).toPromise();
  }

  insertLocation(location: Location): Promise<any> {
    return this.http.post<any>(`${this.baseUrl}/locations`, location, this.httpOptions).toPromise();
  }

  updateLocation(location: Location): Promise<any> {
    return this.http.patch<any>(`${this.baseUrl}/locations/${location.id}`, location, this.httpOptions).toPromise();
  }

}