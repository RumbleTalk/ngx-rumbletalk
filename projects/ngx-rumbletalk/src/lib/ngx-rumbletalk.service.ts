import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NgxRumbletalkService {
  constructor(private http: HttpClient) {}

  address(hash: string): Observable<string> {
    return this.http
      .get<string>(`https://www.rumbletalk.com/client/service.php?hash=${hash}`)
      .pipe(map((data: any) => data.address));
  }

  reload(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  login(data: any) {}

  logout(data: any) {}

  logoutCB(data: any) {}

  private trim(str: string): string {
    return str.replace(/^\s+|\s+$/g, '');
  }

  private validateUsername(username: string): boolean {
    return !/^-?\d+$/.test(username) && username.length < 64;
  }

  private validatePassword(password: string): boolean {
    return 0 < password.length && password.length < 51;
  }

  private validateUrl(url: string): boolean {
    return /(https?:)?\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(url);
  }
}
