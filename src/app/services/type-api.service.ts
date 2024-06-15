import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class TypeApiService {
  public baseUrl = environment.apiUrl + '/types';

  constructor(private http: HttpClient) {}

  public getAll(categoryCode: string = ''): Observable<object> {
    return this.http.get(this.baseUrl + '?category_code=' + categoryCode);
  }
}
