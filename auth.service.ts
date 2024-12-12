import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://nehemia.it.scu.edu.au/personaltrainer/client';

  constructor(private http: HttpClient) {}

  /**
   * Login using POST method with email and password in the request body.
   */
  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    console.log('Login URL:', url); // Debug the URL

    // Send credentials in the POST request body
    return this.http.post<any>(url, { email, password }).pipe(
      map((response) => {
        console.log('API Response:', response); // Debug API response

        if (response && response.client_id) {
          console.log('Matched Client:', response); // Debug the matched client
          localStorage.setItem('clientData', JSON.stringify(response));
          return response; // Return the matched client
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError((error) => {
        console.error('API Error:', error.message || error); // Log API errors
        return throwError(() => new Error('Invalid credentials or server error'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('clientData');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('clientData');
  }
}
