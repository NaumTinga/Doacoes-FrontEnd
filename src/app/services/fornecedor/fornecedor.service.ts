import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {Fornecedor} from "../../models/fornecedor/fornecedor";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private apiUrl = environment.apiUrl + "api/fornecedor";

  constructor(private http: HttpClient) { }

  getFornecedores (): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl);
  }

  getFornecedorById(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.apiUrl}/${id}`);
  }

  saveFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.apiUrl}/`, fornecedor)
      .pipe(catchError(this.handleError));
  }

  updateFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.apiUrl}/${fornecedor.id}/`, fornecedor)
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
