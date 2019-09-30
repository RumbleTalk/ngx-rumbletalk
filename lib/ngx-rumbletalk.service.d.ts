import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class NgxRumbletalkService {
    private http;
    constructor(http: HttpClient);
    address(hash: string): Observable<string>;
    reload(url: string): Observable<any>;
}
