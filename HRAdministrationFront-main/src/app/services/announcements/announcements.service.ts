import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from 'src/app/models/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  private apiUrl = `${environment.apiUrl}/announcements`;

  constructor(private http: HttpClient) {}

  getAllAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl);
  }

  uploadAnnouncement(formData : FormData): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.apiUrl}/upload`,formData);
  }

  getAnnouncementById(id: number): Observable<Announcement> {
    return this.http.get<Announcement>(`${this.apiUrl}/${id}`);
  }

  updateAnnouncement(id: number, data: FormData | Announcement): Observable<Announcement> {
    if (data instanceof FormData) {
      return this.http.put<Announcement>(`${this.apiUrl}/${id}`, data);
    } else {
      return this.http.put<Announcement>(`${this.apiUrl}/${id}`, data);
    }
  }

  deleteAnnouncement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/image/${filename}`, { responseType: 'blob' });
  }

  
  
}
