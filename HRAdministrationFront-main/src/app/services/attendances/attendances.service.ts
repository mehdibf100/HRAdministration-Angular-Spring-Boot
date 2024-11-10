import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from 'src/app/models/attendance'; 

@Injectable({
  providedIn: 'root'
})
export class AttendancesService {

  private apiUrl = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) { }

  punchIn(): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/punchin`, {});
  }

  punchOut(): Observable<Attendance> {
    return this.http.post<Attendance>(`${this.apiUrl}/punchout`, {});
  }

  getAttendanceForConnectedUser(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/connectedUser`);
  }

  getAttendanceByUserId(userId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/user/${userId}`);
  }

  getAllAttendances(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/all`);
  }

  getAttendancesPerMonth(userId: number, startDate: string, endDate: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/user/${userId}/month`, {
      params: { startDate, endDate }
    });
  }

  getAttendancesByMonthForConnectedUser(startDate: string, endDate: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/connectedUser/month`, {
      params: { startDate, endDate }
    });
  }

  deleteAttendance(attendanceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${attendanceId}`);
  }
  
  getAttendanceById(attendanceId:number):Observable<Attendance>{
    return this.http.get<Attendance>(`${this.apiUrl}/${attendanceId}`);
  }
  updateAttendance(attendanceId:number, attendance: Attendance):Observable<Attendance>{
    return this.http.put<Attendance>(`${this.apiUrl}/${attendanceId}`, attendance);
}

getTotalAttendances(): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/count-attendances`);
}
testAttendanceToday(){
  return this.http.get(this.apiUrl+"/test");
}
getAttendanceByDate(){
  return this.http.get(this.apiUrl+"/getByDate",{});
}

}