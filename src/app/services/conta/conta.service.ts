import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conta} from "../../models/conta/conta";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ContaService {
  private apiUrl = environment.apiUrl + "api/conta";

  constructor(private http: HttpClient) { }

  // Get List of all Contas
  getContas(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.apiUrl);
  }

  getContaById(id: number): Observable<Conta> {
    return this.http.get<Conta>(`${this.apiUrl}/${id}`);
  }

  saveConta(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(`${this.apiUrl}/`, conta);
  }

  updateConta(conta: Conta): Observable<Conta> {
    return this.http.put<Conta>(`${this.apiUrl}/${conta.id}/`, conta);
  }

}
