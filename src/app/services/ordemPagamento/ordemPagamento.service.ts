import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {OrdemPagamento} from "../../models/ordemPagamento/ordemPagamento";

@Injectable({
  providedIn: 'root'
})
export class OrdemPagamentoService {

  private apiUrl = environment.apiUrl + 'api/ordemPagamento';

  constructor(private http: HttpClient) { }

  getAll(): Observable<OrdemPagamento[]> {
    return this.http.get<OrdemPagamento[]>(this.apiUrl);
  }

  getById(id: number): Observable<OrdemPagamento> {
    return this.http.get<OrdemPagamento>(`${this.apiUrl}/${id}`);
  }

  save(orgemPagamento: OrdemPagamento): Observable<OrdemPagamento> {
    return this.http.post<OrdemPagamento>(`${this.apiUrl}/`, orgemPagamento)
      .pipe(catchError(this.handleError));
  }

  update(ordemPagamento: OrdemPagamento): Observable<OrdemPagamento> {
    return this.http.put<OrdemPagamento>(`${this.apiUrl}/${ordemPagamento.id}`, ordemPagamento)
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
