import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
    return this.http.post<RequisicaoRubrica>(`${this.apiUrl}/`, requisicaoRubrica);
  }

  updateRequisicaoRubrica(requisicaoRubrica: RequisicaoRubrica): Observable<RequisicaoRubrica> {
    return this.http.put<RequisicaoRubrica>(`${this.apiUrl}/${requisicaoRubrica.id}/`, requisicaoRubrica);
  }

}
