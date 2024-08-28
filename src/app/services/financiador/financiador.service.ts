import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Financiador} from "../../models/financiador/financiador";
import {catchError, Observable, throwError} from "rxjs";
import {Conta} from "../../models/conta/conta";
import {Financiamento} from "../../models/financiamento/financiamento";


@Injectable({
  providedIn: 'root'
})

export class FinanciadorService {

  private apiUrl = environment.apiUrl + "api/financiador";

  constructor(private http: HttpClient) { }

  getFinanciadores(): Observable<Financiador[]> {
    return this.http.get<Financiador[]>(this.apiUrl);
  }

  getFinanciadorById(id: number): Observable<Financiador> {
    return this.http.get<Financiador>(`${this.apiUrl}/${id}`);
  }

  getFinanciadorContas(id: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.apiUrl}/${id}/contas/`);
  }

  getFinanciadorFinanciamentos(id: number): Observable<Financiamento[]> {
    return this.http.get<Financiamento[]>(`${this.apiUrl}/${id}/financiamentos/`);
  }

  saveFinanciador(financiador: Financiador): Observable<Financiador> {
    return this.http.post<Financiador>(`${this.apiUrl}/`, financiador)
      .pipe(catchError(this.handleError));
  }

  updateFinanciador(financiador: Financiador): Observable<Financiador> {
    return this.http.put<Financiador>(`${this.apiUrl}/${financiador.id}/`, financiador)
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
