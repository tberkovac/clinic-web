import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admission } from '../models/admission';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private http: HttpClient) { }

  createAdmission(admission: Admission) : Observable<Admission> {
    return this.http.post<Admission>('https://localhost:7125/Admissions/Create', admission)
  }

  getAdmissions() : Observable<Admission[]> {
    return this.http.get<Admission[]>('https://localhost:7125/Admissions/GetAll')
  }

  getAdmissionsForUser(userId: number) : Observable<Admission[]> {
    return this.http.get<Admission[]>(`https://localhost:7125/Admissions/GetDoctorsAdmissions/${userId}`)
  }

  updateAdmission(admission: Admission) : Observable<Admission> {
    return this.http.put<Admission>('https://localhost:7125/Admissions/Update', admission)
  }
}
