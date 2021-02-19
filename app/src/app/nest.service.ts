import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../environments/environment';
import { Nest } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class NestService {

  baseUrl: string;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiBaseUrl;
  }

  getNest(nestId: number): Observable<Nest> {
    console.log(`getting location ${nestId}`)
    return this.http.get<Nest>(`${this.baseUrl}/nests/${nestId}`);
  }

  insertNest(locationId: Number, nest: Nest): Promise<any> {
    console.log(locationId, nest);
    return this.http.post<any>(`${this.baseUrl}/locations/${locationId}/nests`, nest, this.httpOptions).toPromise();
  }
  
  deleteNest(nestId: number): Promise<any> {
    return this.http.delete<any>(`${this.baseUrl}/nests/${nestId}`).toPromise();
  }

  updateNest(nest: Nest): Promise<any> {
    return this.http.patch<any>(`${this.baseUrl}/nests/${nest.id}`, nest, this.httpOptions).toPromise();
  }

}
