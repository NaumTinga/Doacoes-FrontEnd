import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {RubricaEstado} from "../../models/rubricaEstado/rubricaEstado";


@Injectable({
  providedIn: 'root'
})

export class RubricaEstadoService {

  private apiUrl = environment.apiUrl + '/api/rubricaEstado';

  constructor(private http: HttpClient) { }

  getRubricaEstados(): Observable<RubricaEstado[]> {
    return this.http.get<RubricaEstado[]>(this.apiUrl);
  }

  getRubricaEstadoById(id: number): Observable<RubricaEstado> {
    return this.http.get<RubricaEstado>(`${this.apiUrl}/${id}`);
  }

  saveRubricaEstado(rubricaEstado: RubricaEstado): Observable<RubricaEstado> {
    return this.http.post<RubricaEstado>(`${this.apiUrl}/`, rubricaEstado);
  }

  updateRubricaEstado(rubricaEstado: RubricaEstado): Observable<RubricaEstado> {
    return this.http.put<RubricaEstado>(`${this.apiUrl}/${rubricaEstado.id}/`, rubricaEstado);
  }


}
