import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = `${environment.apiUrl}/files`;

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.apiUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }


  listFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/list`);
  }

  getFile(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${filename}`, {
      responseType: 'blob'
    });
  }

  deleteFile(filename: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${filename}`);
  }
}
