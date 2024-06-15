import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class WebApiService {
  private baseUrl = '';

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  public getSyaratKetentuan(): Observable<Object> {
    const url = this.baseUrl + '/syarat-ketentuan';
    return this.http.get(url);
  }
}
