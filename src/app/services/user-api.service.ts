import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private baseUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  public async current(): Promise<Observable<Object>> {
    const url = this.baseUrl + '/current';
    const token = await this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(url, {
      headers: headers,
    });
  }
}
