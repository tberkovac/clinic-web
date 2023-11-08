import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admission } from '../models/admission';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/pageResponse';

@Injectable({
  providedIn: 'root'
})
export class AdmissionService {

  constructor(private http: HttpClient) { }

  createAdmission(admission: Admission): Observable<Admission> {
    return this.http.post<Admission>('https://localhost:7125/Admissions/Create', admission)
  }

  getAdmissions(page: number, pageSize: number, filter?: any): Observable<PageResponse<Admission>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filter.start && filter.end) {
      params = params.set('startDate', filter.start.toISOString())
        .set('endDate', filter.end.toISOString())
    }
    return this.http.get<PageResponse<Admission>>('https://localhost:7125/Admissions/GetAll', { params })
  }

  getAdmissionsForUser(userId: number, page: number, pageSize: number, filter?: any): Observable<PageResponse<Admission>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())

    if (filter.start && filter.end) {
      params = params.set('startDate', filter.start.toISOString())
        .set('endDate', filter.end.toISOString())
    }
    return this.http.get<PageResponse<Admission>>(`https://localhost:7125/Admissions/GetDoctorsAdmissions/${userId}`, { params })
  }

  updateAdmission(admission: Admission): Observable<Admission> {
    return this.http.put<Admission>('https://localhost:7125/Admissions/Update', admission)
  }

  deleteAdmission(admissionId: number): Observable<Admission> {
    return this.http.delete<Admission>(`https://localhost:7125/Admissions/Delete/${admissionId}`)
  }
}
