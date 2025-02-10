import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  loginWithTest() {
    const url = 'http://localhost:57134';

    const params = new HttpParams()
          .set('set-agency', '96010')
          .set('redirect', 'true');

    this.http.get(url, { params, withCredentials: true }).subscribe((response: any) => {
      console.log('loginWithTest response:');
      console.log(response);
    });
  }

  setAuthToken(token: string) {
    this.cookieService.set('authToken', token, { path: '/', secure: true, sameSite: 'None' });
  }

  getAuthToken(): string {
    return this.cookieService.get('authToken');
  }

  deleteAuthToken() {
    this.cookieService.delete('authToken');
  }
}