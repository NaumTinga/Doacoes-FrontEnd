import {Injectable} from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {Financiador} from "../../models/financiador/financiador";
import {Financiamento} from "../../models/financiamento/financiamento";

@Injectable({
  providedIn: 'root'
})

export class FinanciamentoService {
  private apiUrl = environment.apiUrl + "api/financiamento";

  constructor(private http: HttpClient) { }

  getFinanciamentos(): Observable<Financiamento[]> {
    return this.http.get<Financiamento[]>(this.apiUrl);
  }

  getFinanciamentoById(id: number): Observable<Financiamento>{
    return this.http.get<Financiamento>(`${this.apiUrl}/${id}`);
  }

  saveFinanciamento(financiamento: Financiamento): Observable<Financiamento> {
    return this.http.post<Financiamento>(`${this.apiUrl}/`, financiamento)
      .pipe(catchError(this.handleError)); // to catch and view errors from the server in the browser console
  }

  updateFinanciamento(financiamento: Financiamento): Observable<Financiamento> {
    return this.http.put<Financiamento>(`${this.apiUrl}/${financiamento.id}/`, financiamento)
      .pipe(catchError(this.handleError)); // to catch and view errors from the server in the browser console

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
