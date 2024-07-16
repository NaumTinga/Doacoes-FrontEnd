
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Cambio} from "../../models/cambio/cambio";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CambioService {

  private apiUrl = environment.apiUrl + "api/cambio";

  constructor(private http: HttpClient) { }

  getCambios(): Observable<Cambio[]> {
    return this.http.get<Cambio[]>(this.apiUrl);
  }

  getCambioById(id: number): Observable<Cambio> {
    return this.http.get<Cambio>(`${this.apiUrl}/${id}`);
  }

  saveCambio(cambio: Cambio): Observable<Cambio> {
    return this.http.post<Cambio>(`${this.apiUrl}/`, cambio);
  }

  bulkSaveCambios(cambios: Cambio[]): Observable<Cambio[]> {
    return this.http.post<Cambio[]>(`${this.apiUrl}/bulk_create/`, cambios);
  }

  updateCambio(cambio: Cambio): Observable<Cambio> {
    return this.http.put<Cambio>(`${this.apiUrl}/${cambio.id}/`, cambio);
  }

}
