import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http : HttpClient) {}

  getPatients() {
    return this.http.get('http://localhost:5215/WeatherForecast')
  }
}
