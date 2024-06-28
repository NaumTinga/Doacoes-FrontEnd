import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Pais} from "../../models/pais/pais.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PaisService {
    private apiUrl = environment.apiUrl + 'api/pais'; // Assuming your endpoint is something like /api/paises

    constructor(private http: HttpClient) {}

  // Get a List of all countries
    getPaises(): Observable<Pais[]> {
        return this.http.get<Pais[]>(this.apiUrl);
    }
    getPaisById(id: number): Observable<Pais> {
        return this.http.get<Pais>(`${this.apiUrl}/${id}`);
    }
    createPais(pais: Pais): Observable<Pais> {
        return this.http.post<Pais>(`${this.apiUrl}/`, pais);
    }
    updatePais(pais: Pais): Observable<Pais> {
        return this.http.put<Pais>(`${this.apiUrl}/${pais.id}/`, pais);
    }
    deletePais(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}