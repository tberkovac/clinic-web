import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Record } from '../models/record';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) { }

  createRecord(record: Record, admissionId: number) : Observable<Record> {
    return this.http.post<Record>(`https://localhost:7125/Records/CreateRecord/${admissionId}`, record)
  }
}
