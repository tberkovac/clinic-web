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
    return this.http.post<Admission>('', admission)
  }
}
