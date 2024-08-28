import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import { Injectable } from "@angular/core";
import {environment} from "../../../environments/environment";
import {Projecto} from "../../models/projecto/projecto";
import {RubricaProjecto} from "../../models/rubricaProjecto/rubricaProjecto";

@Injectable({
  providedIn: 'root'
})
export class ProjectoService {
  private apiUrl = environment.apiUrl + 'api/projecto';

  constructor(private http: HttpClient) {}

  getProjectos(): Observable<Projecto[]> {
   return this.http.get<Projecto[]>(this.apiUrl);
  }

  getProjectoById(id: number): Observable<Projecto> {
    return this.http.get<Projecto>(`${this.apiUrl}/${id}`);
  }

  getRubricasProjecto(id: number): Observable<RubricaProjecto[]> {
    return this.http.get<RubricaProjecto[]>(`${this.apiUrl}/${id}/rubricas_projecto/`);
  }

  saveProjecto(projecto: Projecto): Observable<Projecto> {
    return this.http.post<Projecto>(`${this.apiUrl}/`, projecto)
      .pipe(catchError(this.handleError));
  }

  updateProjecto(projecto: Projecto): Observable<Projecto> {
    return this.http.put<Projecto>(`${this.apiUrl}/${projecto.id}/`, projecto)
      .pipe(catchError(this.handleError));
  }


  // The handleError method
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    // Return an observable with a user-facing error message.
    return throwError(error.error);
  }
}
