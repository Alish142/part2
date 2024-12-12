import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://nehemia.it.scu.edu.au/personaltrainer';

  constructor(private http: HttpClient) {}

  /**
   * Returns the default HTTP headers.
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  }

  /**
   * Handles errors from API requests.
   */
  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status}, message: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  /**
   * Fetches client details by personal trainer ID and client ID.
   */

getClientDetails(personalTrainerId: string, clientId: string): Observable<any> {
  const url = `${this.apiUrl}/client/${personalTrainerId}/${clientId}`;
  console.log('Fetching client details from:', url);

  return this.http.get(url, { headers: this.getHeaders() }).pipe(
    tap((response) => console.log('Client details response:', response)),
    catchError(this.handleError)
  );
}

  
  getWorkoutPlan(clientId: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/workoutplan/${clientId}`,
      { headers: this.getHeaders() }
    ).pipe(
      tap(response => console.log('Workout plan response:', response)),
      catchError(this.handleError)
    );
  }
}

