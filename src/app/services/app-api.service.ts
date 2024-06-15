import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {
    //
  }

  // auth
  public register(data: {
    name: string;
    number_phone: string;
    password: string;
  }): Observable<object> {
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post(url, data);
  }

  public verification(data: { number_phone: string }): Observable<object> {
    return this.http.post(`${this.baseUrl}/auth/verification`, data);
  }

  public forgotPassword(data: { number_phone: string }): Observable<object> {
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, data);
  }

  public login(data: {
    number_phone: string;
    password: string;
  }): Observable<object> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }
  // end auth

  public getCategories(): Observable<Object> {
    return this.http.get(this.baseUrl + '/categories');
  }

  public getTypes(categoryCode: string = ''): Observable<object> {
    return this.http.get(this.baseUrl + '/types?category_code=' + categoryCode);
  }

  public getType(code: string): Observable<Object> {
    return this.http.get(this.baseUrl + '/types/' + code);
  }

  public getProducts(typeCode: string = ''): Observable<Object> {
    return this.http.get(this.baseUrl + '/products?type_code=' + typeCode);
  }

  public getProduct(code: string): Observable<Object> {
    return this.http.get(this.baseUrl + '/products/' + code);
  }

  public getInfo(id: number): Observable<Object> {
    const url = `${this.baseUrl}/infos/${id}`;
    return this.http.get(url);
  }

  public getInfos(): Observable<Object> {
    return this.http.get(this.baseUrl + '/infos');
  }

  public getSyaratKetentuan(): Observable<Object> {
    const url = this.baseUrl + '/syarat-ketentuan';
    return this.http.get(url);
  }

  public getContacts(): Observable<Object> {
    const url = this.baseUrl + '/contacts';
    return this.http.get(url);
  }

  public getContact(id: string): Observable<Object> {
    const url = this.baseUrl + '/contacts/' + id;
    return this.http.get(url);
  }

  public async getUserCurrent(): Promise<Observable<Object>> {
    const url = this.baseUrl + '/current';
    const token = await this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(url, {
      headers: headers,
    });
  }

  public getServices(productCode: string = ''): Observable<Object> {
    const url = `${this.baseUrl}/services?type_code=${productCode}`;
    return this.http.get(url);
  }
}
