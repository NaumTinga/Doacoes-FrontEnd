import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Assinante} from "../../models/assinante/assinante";

@Injectable({
  providedIn: 'root'
})
export class AssinanteService {

  private apiUrl = environment.apiUrl + '/api/assinante';

  constructor(private http: HttpClient) {

  }

  getAssinantes(): Observable<Assinante[]> {
    return this.http.get<Assinante[]>(this.apiUrl);
  }

  getAssinanteById(id: number): Observable<Assinante> {
    return this.http.get<Assinante>(`${this.apiUrl}/${id}`);
  }

  save(assinante: Assinante): Observable<Assinante> {
    return this.http.post<Assinante>(`${this.apiUrl}/`, assinante);
  }

  update(assinante: Assinante): Observable<Assinante> {
    return this.http.put<Assinante>(`${this.apiUrl}/${assinante.id}/`, assinante);
  }
}

