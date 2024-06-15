import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private baseUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}

  public getAll(typeCode: string = ''): Observable<object> {
    return this.http.get(this.baseUrl + '?type_code=' + typeCode);
  }

  public getOne(id: number): Observable<object> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url);
  }
}
