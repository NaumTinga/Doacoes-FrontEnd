import { Component, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { SubProjecto} from "src/app/models/subProjecto/subProjecto";

@Component({
    selector: 'app-subProjecto',
    templateUrl: './subProjecto.component.html',
  })
@Injectable({
    providedIn: 'root'
    })

export class subProjectoComponent {
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