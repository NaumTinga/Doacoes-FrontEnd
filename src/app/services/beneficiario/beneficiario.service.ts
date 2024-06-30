import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Beneficiario} from "../../models/beneficiario/beneficiario.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BeneficiarioService {
    private apiUrl = environment.apiUrl + 'api/beneficiario'; // Assuming your endpoint is something like /api/actividades
    constructor (private http: HttpClient) {}

  getBeneficiarios(): Observable<Beneficiario[]> {
      return this.http.get<Beneficiario[]>(this.apiUrl);
  }
    getBeneficiarioById(id: number): Observable<Beneficiario> {
        return this.http.get<Beneficiario>(`${this.apiUrl}/${id}`);
    }

    createBeneficiario(beneficiario: Beneficiario): Observable<Beneficiario> {
        return this.http.post<Beneficiario>(`${this.apiUrl}/`, beneficiario);
    }

    updateBeneficiario(beneficiario: Beneficiario): Observable<Beneficiario> {
        return this.http.put<Beneficiario>(`${this.apiUrl}/${beneficiario.id}/`, beneficiario);
    }

    deleteBeneficiario(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    
}