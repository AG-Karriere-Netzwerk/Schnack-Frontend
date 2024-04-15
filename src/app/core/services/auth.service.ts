import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthRequest} from "../requests/auth.request";
import {AuthResponse} from "../responses/auth.response";
import {catchError, of, tap} from "rxjs";
import {RegisterRequest} from "../requests/register.request";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  public isAuthenticated() {
    return this.httpClient.get<string>("http://localhost:8080/api/v1/authentication/authenticated")
      .pipe(catchError(this.handleError));
  }

  public login(request: AuthRequest) {
    return this.httpClient.post<AuthResponse>("http://localhost:8080/api/v1/authentication/login", request)
      .pipe(
        tap(response => localStorage.setItem("schnack-jwt", response.token)),
        catchError(this.handleError)
      );
  }

  public register(request: RegisterRequest) {
    return this.httpClient.post<AuthResponse>("http://localhost:8080/api/v1/authentication/register", request)
      .pipe(
        tap(response => localStorage.setItem("schnack-jwt", response.token)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    const jwt = localStorage.getItem("schnack-jwt");

    if (error.status === 401) {

    } else if (error.status === 403) {
      if (jwt) {
        localStorage.removeItem("schnack-jwt");
      }
    }

    return of(false);
  }
}
