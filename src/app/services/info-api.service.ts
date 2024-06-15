import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class InfoApiService {
  private baseUrl = environment.apiUrl + '/infos';

  constructor(private http: HttpClient) {
    //
  }

  public getOne(id: number): Observable<Object> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }

  public getAll(): Observable<Object> {
    return this.http.get(this.baseUrl);
  }
}
