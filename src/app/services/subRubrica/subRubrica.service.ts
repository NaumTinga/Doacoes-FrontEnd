import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SubRubrica} from "../../models/subRubrica/subRubrica";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SubRubricaService {
  private apiUrl = environment.apiUrl + 'api/subRubrica';

  constructor(private http: HttpClient) { }

  getSubRubricas(): Observable<SubRubrica[]> {
    return this.http.get<SubRubrica[]>(this.apiUrl);
  }

  getSubRubricaById(id: number): Observable<SubRubrica> {
    return this.http.get<SubRubrica>(`${this.apiUrl}/${id}`);
  }

  saveSubRubrica(subRubrica: SubRubrica): Observable<SubRubrica> {
    return this.http.post<SubRubrica>(`${this.apiUrl}/`, subRubrica).pipe(catchError(this.handleError));
  }

  updateSubRubrica(subRubrica: SubRubrica): Observable<SubRubrica> {
    return this.http.put<SubRubrica>(`${this.apiUrl}/${subRubrica.id}/`, subRubrica).pipe(catchError(this.handleError));
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
