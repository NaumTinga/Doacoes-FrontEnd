import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = "http://localhost:8080/";
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/auth/login/`, { email, password })
      .pipe(
        map(user => {
          if (user && user.access) { // Make sure to use the access token
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        }),
        catchError(this.handleError)
      );
  }


  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Updated handleError method to return an Observable
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }

    console.error(errorMessage);
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


}
