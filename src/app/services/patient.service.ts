import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http : HttpClient) {}

  getPatients() : Observable<Patient[]>{
    return this.http.get<Patient[]>('https://localhost:7125/Patients/GetAll')
  }

  createPatient(patient: Patient) : Observable<Patient> {
    return this.http.post<Patient>('https://localhost:7125/Patients/Create', patient);
  }
}
