import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Moeda} from "../../models/moeda/moeda";

@Injectable({
  providedIn: 'root'
})

export class MoedaService {
  private apiUrl = environment.apiUrl + 'api/moeda/';

  constructor(private http: HttpClient) {}

  getMoeda(): Observable<Moeda[]> {
    return this.http.get<Moeda[]>(`${this.apiUrl}`);
  }

  getMoedaById(id: number): Observable<Moeda> {
    return this.http.get<Moeda>(`${this.apiUrl}${id}`);
  }

  saveMoeda(moeda: Moeda): Observable<Moeda> {
    return this.http.post<Moeda>(this.apiUrl, moeda);
  }
}
