import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Actividade} from "../../models/actividade/actividade.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
  })

  export class ActividadeService {
    private apiUrl = environment.apiUrl + 'api/actividade'; // Assuming your endpoint is something like /api/actividades
    constructor (private http: HttpClient) {}

    // Get a List of all activitys
    getActividades(): Observable<Actividade[]> {
        return this.http.get<Actividade[]>(this.apiUrl);
    }
    getActividadeById(id: number): Observable<Actividade> {
        return this.http.get<Actividade>(`${this.apiUrl}/${id}`);
    }
    createActividade(actividade: Actividade): Observable<Actividade> {
        return this.http.post<Actividade>(`${this.apiUrl}/`, actividade);
    }
    updateActividade(actividade: Actividade): Observable<Actividade> {
        return this.http.put<Actividade>(`${this.apiUrl}/${actividade.id}/`, actividade);
    }
    deleteActividade(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
  }