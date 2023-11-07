import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { PageResponse } from '../models/pageResponse';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http : HttpClient) {}

  getAllPatients() : Observable<Patient[]>{
    return this.http.get<Patient[]>('https://localhost:7125/Patients/GetAll')
  }

  getPatients(page: number, pageSize: number) : Observable<PageResponse<Patient>>{
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    return this.http.get<PageResponse<Patient>>('https://localhost:7125/Patients/GetPage', { params })
  }

  createPatient(patient: Patient) : Observable<Patient> {
    return this.http.post<Patient>('https://localhost:7125/Patients/Create', patient);
  }

  deletePatient(patientId: number) : Observable<Patient> {
    return this.http.delete<Patient>(`https://localhost:7125/Patients/Delete/${patientId}`)
  }
}
