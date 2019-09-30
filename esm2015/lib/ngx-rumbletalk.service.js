/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class NgxRumbletalkService {
    /**
     * @param {?} http
     */
    constructor(http) {
        this.http = http;
    }
    /**
     * @param {?} hash
     * @return {?}
     */
    address(hash) {
        return this.http
            .get(`https://www.rumbletalk.com/client/service.php?hash=${hash}`)
            .pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        data => data['address'])));
    }
    /**
     * @param {?} url
     * @return {?}
     */
    reload(url) {
        return this.http.get(url);
    }
}
NgxRumbletalkService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxRumbletalkService.ctorParameters = () => [
    { type: HttpClient }
];
/** @nocollapse */ NgxRumbletalkService.ngInjectableDef = i0.defineInjectable({ factory: function NgxRumbletalkService_Factory() { return new NgxRumbletalkService(i0.inject(i1.HttpClient)); }, token: NgxRumbletalkService, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxRumbletalkService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ydW1ibGV0YWxrLyIsInNvdXJjZXMiOlsibGliL25neC1ydW1ibGV0YWxrLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBS3JDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFDL0IsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFHLENBQUM7Ozs7O0lBRXhDLE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQVMsc0RBQXNELElBQUksRUFBRSxDQUFDO2FBQ3pFLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQVc7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBTSxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUFkRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFOUSxVQUFVOzs7Ozs7OztJQVFMLG9DQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neFJ1bWJsZXRhbGtTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50KSB7fVxuXG4gIGFkZHJlc3MoaGFzaDogc3RyaW5nKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAuZ2V0PHN0cmluZz4oYGh0dHBzOi8vd3d3LnJ1bWJsZXRhbGsuY29tL2NsaWVudC9zZXJ2aWNlLnBocD9oYXNoPSR7aGFzaH1gKVxuICAgICAgLnBpcGUobWFwKGRhdGEgPT4gZGF0YVsnYWRkcmVzcyddKSk7XG4gIH1cblxuICByZWxvYWQodXJsOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueT4odXJsKTtcbiAgfVxufVxuIl19