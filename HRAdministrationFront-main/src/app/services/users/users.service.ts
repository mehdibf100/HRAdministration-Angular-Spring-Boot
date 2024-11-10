import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`);
  }

  getEmployees(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/employee`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/${id}`);
  }

  getEmployeeById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/employee/${id}`);
  }

  addUser(reqResPayload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}/signup`, reqResPayload, { headers });
  }
    updateUser(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/update-user/`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/authenticiated`);
  }

  getTotalUsers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count-users`);
  }

  getImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/image/${filename}`, { responseType: 'blob' });
  }

  uploadUserProfilePicture(userId: number, file: File): Observable<User> {
    const formData = new FormData();
    formData.append('file', file); 

    return this.http.post<User>(`${this.apiUrl}/user/${userId}/upload-picture`, formData);
  }
  
}
