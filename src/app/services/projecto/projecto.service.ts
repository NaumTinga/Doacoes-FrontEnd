import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectoService {
  private apiUrl = environment.apiUrl + 'api/projecto';

  constructor(private http: HttpClient) {}
}
