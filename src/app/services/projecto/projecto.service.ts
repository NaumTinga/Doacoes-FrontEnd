import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs"
import { Projecto } from "src/app/models/projecto/projecto.model";
@Injectable({
    providedIn: 'root'
})

export class ProjectoService {
    private apiUrl = environment.apiUrl +'api/projecto'

    constructor(private http: HttpClient){

    }

    getProjectos(): Observable<Projecto[]> {
        return this.http.get<Projecto[]>(this.apiUrl);
      }
      getProjectoById(id: number): Observable<Projecto>{
     return this.http.get<Projecto>(`${this.apiUrl}/${id}`);
      }

    saveProjecto(projecto:Projecto): Observable<Projecto> {
        return this.http.post<Projecto>(`${this.apiUrl}/`, projecto);
    }
    updateProjecto(projecto: Projecto):Observable<Projecto>{
        return this.http.put<Projecto>(`${this.apiUrl}/${projecto.id}/`, projecto)
    }
}