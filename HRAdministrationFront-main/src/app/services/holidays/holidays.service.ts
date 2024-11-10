import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Holiday } from 'src/app/models/holiday';
@Injectable({
  providedIn: 'root'
})
export class HolidaysService {
  private apiUrl = `${environment.apiUrl}/holidays`;

  constructor(private http: HttpClient) { }

  getAllHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.apiUrl);
  }

  getHolidayById(id: number): Observable<Holiday> {
    return this.http.get<Holiday>(`${this.apiUrl}/${id}`);
  }

  createHoliday(holiday: Holiday): Observable<Holiday> {
    return this.http.post<Holiday>(this.apiUrl, holiday);
  }

  updateHoliday(id: number, holiday: Holiday): Observable<Holiday> {
    return this.http.put<Holiday>(`${this.apiUrl}/${id}`, holiday);
  }

  deleteHoliday(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    
  }

  getUpcomingHolidays(): Observable<Holiday[]>{
    return this.http.get<Holiday[]>(`${this.apiUrl}/upcoming-holidays`);
  }


}
