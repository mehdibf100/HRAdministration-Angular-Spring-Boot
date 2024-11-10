import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Complaint } from 'src/app/models/complaint';


@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  private apiUrl = `${environment.apiUrl}/complaint`;

  constructor(private http: HttpClient) { }

  getComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.apiUrl);
  }

  getComplaintById(id: number): Observable<Complaint> {
    return this.http.get<Complaint>(`${this.apiUrl}/${id}`);
  }

  createComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(this.apiUrl, complaint);
  }

  updateComplaint(id: number, complaint: Complaint): Observable<Complaint> {
    return this.http.put<Complaint>(`${this.apiUrl}/${id}`, complaint);
  }

  deleteComplaint(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    
  }
  getComplaintsByUserId(userId: number): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.apiUrl}/user/${userId}`);
  }





}
