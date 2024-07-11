import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { SubProjecto } from "../../models/subProjecto/subProjecto";

@Injectable({
    providedIn: 'root'
    })

export class SubProjectoService {
    private apiUrl = environment.apiUrl + '/api/subProjecto';
    constructor(private http: HttpClient) { }
    getSubProjectos(): Observable<SubProjecto[]> {
        return this.http.get<SubProjecto[]>(this.apiUrl);
    }    
    getSubProjectoById(id: number): Observable<SubProjecto> {
        return this.http.get<SubProjecto>(`${this.apiUrl}/${id}`);
    }
    saveSubProjecto(subProjecto: SubProjecto): Observable<SubProjecto> {
        return this.http.post<SubProjecto>(`${this.apiUrl}/`, subProjecto);
    }
    updateSubProjecto(subProjecto: SubProjecto): Observable<SubProjecto> {
        return this.http.put<SubProjecto>(`${this.apiUrl}/${subProjecto.id}/`, subProjecto);
    }
}