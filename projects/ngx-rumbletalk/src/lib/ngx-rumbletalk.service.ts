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
      .pipe(map(data => data['address']));
  }

  reload(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
