import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {Beneficiario} from "../../models/beneficiario/beneficiario.model";
import {catchError, Observable, throwError} from "rxjs";
import {Conta} from "../../models/conta/conta";

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  private apiUrl = environment.apiUrl + 'api/beneficiario'; // Assuming your endpoint is something like /api/actividades
  constructor(private http: HttpClient) {
  }

  getBeneficiarios(): Observable<Beneficiario[]> {
    return this.http.get<Beneficiario[]>(this.apiUrl);
  }

  getBeneficiarioById(id: number): Observable<Beneficiario> {
    return this.http.get<Beneficiario>(`${this.apiUrl}/${id}`);
  }

  createBeneficiario(beneficiario: Beneficiario): Observable<Beneficiario> {
    return this.http.post<Beneficiario>(`${this.apiUrl}/`, beneficiario)
      .pipe(catchError(this.handleError)); // to catch and view errors from the server in the browser console
  }

  updateBeneficiario(beneficiario: Beneficiario): Observable<Beneficiario> {
    return this.http.put<Beneficiario>(`${this.apiUrl}/${beneficiario.id}/`, beneficiario)
      .pipe(catchError(this.handleError)); // to catch and view errors from the server in the browser console

  }

  getBeneficiarioContas(id: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(`${this.apiUrl}/${id}/contas/`);
  }

  deleteBeneficiario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
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
