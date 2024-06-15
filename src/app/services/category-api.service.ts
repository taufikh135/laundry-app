import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CategoryApiService {
  private baseUrl = environment.apiUrl + '/categories';

  constructor(private http: HttpClient) {}

  public getAll(): Observable<Object> {
    const url = this.baseUrl;

    return this.http.get(url);
  }
}
