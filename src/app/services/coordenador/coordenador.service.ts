import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Coordenador} from "../../models/coordenador/coordenador.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CoordenadorService {
    private apiUrl = environment.apiUrl + 'api/coordenador'; // Assuming your endpoint is something like /api/coordenadores

    constructor(private http: HttpClient) {}

    // Get a List of all coordenadores
    getCoordenadores(): Observable<Coordenador[]> {
      return this.http.get<Coordenador[]>(this.apiUrl);
    }

    getCoordenadorById(id: number): Observable<Coordenador> {
      return this.http.get<Coordenador>(`${this.apiUrl}/${id}`);
    }

    createCoordenador(coordenador: Coordenador): Observable<Coordenador> {
      return this.http.post<Coordenador>(`${this.apiUrl}/`, coordenador);
    }

    updateCoordenador(coordenador: Coordenador): Observable<Coordenador> {
      return this.http.put<Coordenador>(`${this.apiUrl}/${coordenador.id}/`, coordenador);
    }

    deleteCoordenador(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
