import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pais} from "../../models/pais/pais";

@Injectable({
  providedIn: 'root'
})

export class PaisService {
  private apiUrl = environment.apiUrl + '/api/pais';

  constructor(private http: HttpClient) {

  }

  getPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.apiUrl}`);
  }

  getPaisById(id: number) {
    return this.http.get<Pais>(`${this.apiUrl}/${id}`);
  }

  savePais(pais: Pais) {
    return this.http.post<Pais>(`${this.apiUrl}/`, pais);
  }

  updatePais(pais: Pais) {
    return this.http.put<Pais>(`${this.apiUrl}/${pais.id}/`, pais);
  }

}
