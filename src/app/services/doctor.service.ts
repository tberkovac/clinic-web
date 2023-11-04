import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getDoctors() : Observable<Doctor[]> {
    return this.http.get<Doctor[]>('https://localhost:7125/Doctors/GetAll');
  }

  createDoctor(doctor: Doctor) : Observable<Doctor> {
    return this.http.post<Doctor>('https://localhost:7125/Doctors/Create', doctor);
  }
}
