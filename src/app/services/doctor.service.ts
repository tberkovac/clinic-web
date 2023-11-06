import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/pageResponse';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getAllDoctors() : Observable<Doctor[]> {
    return this.http.get<Doctor[]>('https://localhost:7125/Doctors/GetAll');
  }

  getDoctors(page: number, pageSize: number) : Observable<PageResponse<Doctor>> {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());
    return this.http.get<PageResponse<Doctor>>('https://localhost:7125/Doctors/GetPage', { params });
  }

  createDoctor(doctor: Doctor) : Observable<Doctor> {
    return this.http.post<Doctor>('https://localhost:7125/Doctors/Create', doctor);
  }
}
