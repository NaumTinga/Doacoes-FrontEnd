import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {RequisicaoRubrica} from "../../models/requisicao/requisicaoRubrica";

@Injectable(
  {
    providedIn: 'root'
  }
)

export class RequisicaoRubricaService {

  private apiUrl = environment.apiUrl + '/api/requisicaoRubrica';

  constructor(private http: HttpClient) { }

  getRequisacoesRubricas(): Observable<RequisicaoRubrica[]> {
    return this.http.get<RequisicaoRubrica[]>(this.apiUrl);
  }

  getRequisicaoRubricaById(id: number): Observable<RequisicaoRubrica> {
    return this.http.get<RequisicaoRubrica>(`${this.apiUrl}/${id}`);
  }

  saveRequisicaoRubrica(requisicaoRubrica: RequisicaoRubrica): Observable<RequisicaoRubrica> {
    return this.http.post<RequisicaoRubrica>(`${this.apiUrl}/`, requisicaoRubrica)
      .pipe(catchError(this.handleError));
  }

  updateRequisicaoRubrica(requisicaoRubrica: RequisicaoRubrica): Observable<RequisicaoRubrica> {
    return this.http.put<RequisicaoRubrica>(`${this.apiUrl}/${requisicaoRubrica.id}/`, requisicaoRubrica)
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
