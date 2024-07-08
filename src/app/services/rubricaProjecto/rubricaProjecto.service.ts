import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {RubricaProjecto} from "../../models/rubricaProjecto/rubricaProjecto";
import {Beneficiario} from "../../models/beneficiario/beneficiario.model";

@Injectable({
  providedIn: 'root'
})

export class RubricaProjectoService {

  private apiUrl = environment.apiUrl + 'api/rubricaProjecto'

  constructor(private http: HttpClient) { }

  getRubricaProjectos(): Observable<RubricaProjecto[]> {
    return this.http.get<RubricaProjecto[]>(this.apiUrl);
  }

  getRubricaProjectoById(id: number): Observable<RubricaProjecto> {
    return this.http.get<RubricaProjecto>(`${this.apiUrl}/${id}`);
  }

  saveRubricaProjecto(rubricaProjecto: RubricaProjecto): Observable<RubricaProjecto> {
    return this.http.post<RubricaProjecto>(`${this.apiUrl}/`,rubricaProjecto).pipe(catchError(this.handleError));
  }

  updateRubricaProjecto(rubricaProjecto: RubricaProjecto): Observable<RubricaProjecto> {
    return this.http.put<RubricaProjecto>(`${this.apiUrl}/${rubricaProjecto.id}/`, rubricaProjecto).pipe(catchError(this.handleError));;
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
