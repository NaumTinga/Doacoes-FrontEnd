import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import {UnidadeOrganica} from "../../models/unidadeOrganica/unidadeOrganica";
import {Observable} from "rxjs";
import {Conta} from "../../models/conta/conta";

@Injectable({
  providedIn: 'root'
})

export class UnidadeOrganicaService {
  private apiUrl = environment.apiUrl + "/api/unidadeOrganica";

  constructor(private http: HttpClient) {}

  getUnidadeOrganicas(): Observable<UnidadeOrganica[]> {
    return this.http.get<UnidadeOrganica[]>(this.apiUrl);
  }

  getUnidadeOrganicaById(id: number): Observable<UnidadeOrganica> {
    return this.http.get<UnidadeOrganica>(`${this.apiUrl}/${id}`);
  }

  saveUnidadeOrganica(unidadeOrganica: UnidadeOrganica): Observable<UnidadeOrganica> {
    return this.http.post<UnidadeOrganica>(`${this.apiUrl}/`, unidadeOrganica);
  }

  updateUnidadeOrganica(unidadeOrganica: UnidadeOrganica): Observable<UnidadeOrganica> {
    return this.http.put<UnidadeOrganica>(`${this.apiUrl}/${unidadeOrganica.id}/`, unidadeOrganica);
  }
}
