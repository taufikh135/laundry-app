import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private baseUrl?: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl + '/auth';
  }

  public register(data: {
    name: string;
    number_phone: string;
    password: string;
  }): Observable<object> {
    const url = this.baseUrl + '/register';
    return this.http.post(url, data);
  }

  public verification(data: { number_phone: string }): Observable<object> {
    return this.http.post(this.baseUrl + '/verification', data);
  }

  public forgotPassword(data: { number_phone: string }): Observable<object> {
    return this.http.post(this.baseUrl + '/forgot-password', data);
  }

  public login(data: {
    number_phone: string;
    password: string;
  }): Observable<object> {
    return this.http.post(this.baseUrl + '/login', data);
  }
}
