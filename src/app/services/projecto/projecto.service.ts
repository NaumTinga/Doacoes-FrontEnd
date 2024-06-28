import { projecto } from "src/app/models/projecto/projecto.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ProjectoService {
  private apiUrl = '/api/projecto';

  constructor(private http: HttpClient) {}
}
