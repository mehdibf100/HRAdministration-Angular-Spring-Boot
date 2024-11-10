import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from 'src/app/models/leaverequest';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestsService {

  private apiUrl = `${environment.apiUrl}/leave-requests`;

  constructor(private http: HttpClient) { }

  getAllLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl);
  }

  findLeaveRequestById(id: number): Observable<LeaveRequest> {
    return this.http.get<LeaveRequest>(`${this.apiUrl}/${id}`);
  }

  createLeaveRequest(leaverequest: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.apiUrl, leaverequest);
  }

  updateLeaveRequest(id: number, leaverequest: LeaveRequest): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.apiUrl}/${id}`, leaverequest);
  }

  deleteLeaveRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  approveLeaveRequest(id: number): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.apiUrl}/approve/${id}`, {});
  }

  denyLeaveRequest(id: number): Observable<LeaveRequest> {
    return this.http.put<LeaveRequest>(`${this.apiUrl}/deny/${id}`, {});
  }
  getLeaveRequestsByUserId(userId:number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}/user/${userId}`);
  }

  getLeaveDetails(userId: number, reason: string): Observable<{ maxDays: number, currentDays: number }> {
    return this.http.get<{ maxDays: number, currentDays: number }>(`${this.apiUrl}/details`, {
      params: {
        userId: userId.toString(),
        reason: reason
      }
    });
  }
  getEmployeesCurrentlyOnLeave(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}/employees-on-leave`);
  }

  getTotalEmployeesOnLeave(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count-leave`);
  }


}
