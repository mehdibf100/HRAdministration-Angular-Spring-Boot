import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtPayload } from 'jwt-decode';
import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient,private router:Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, { email, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  forgotpassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, email, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, { token, newPassword }, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = 'An unknown error occurred!';
    if (error.status === 401) {
      errorMsg = 'Incorrect email or password';
    } else if (error.error && error.error.message) {
      errorMsg = error.error.message;
    }
    return throwError(() => new Error(errorMsg));
  }
  isLogin() {
    const token = sessionStorage.getItem('token');
    const role=sessionStorage.getItem('role');
    if (!token || token.length === 0) {
        this.router.navigate(['/login']);
        return false;
    } else {
      switch (role) {
        case 'ROLE_ADMIN':
          this.router.navigate(['/admin-dashboard']);
          break;
        case 'ROLE_ADMINHR':
          this.router.navigate(['/admin-hr-dashboard']);
          break;
        case 'ROLE_EMPLOYEE':
          this.router.navigate(['/employee-dashboard']);
          break;
    }
    return true;
  }
}
GetuserLogin(){
  return this.http.get(this.baseUrl+"/user/authenticiated")
}
}

