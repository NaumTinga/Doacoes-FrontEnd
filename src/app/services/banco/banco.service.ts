import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import {Banco} from "../../models/banco/banco.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})

export class BancoService {
  private apiUrl = environment.apiUrl + 'api/banco'; // Assuming your endpoint is something like /api/bancos

  constructor(private http: HttpClient) {}

  // Get a List of all bancos
  getBancos(): Observable<Banco[]> {
    return this.http.get<Banco[]>(this.apiUrl);
  }

  getBancoById(id: number): Observable<Banco> {
    return this.http.get<Banco>(`${this.apiUrl}/${id}`);
  }

  createBanco(banco: Banco): Observable<Banco> {
    return this.http.post<Banco>(`${this.apiUrl}/`, banco);
  }

  updateBanco(banco: Banco): Observable<Banco> {
    return this.http.put<Banco>(`${this.apiUrl}/${banco.id}/`, banco);
  }

  deleteBanco(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
