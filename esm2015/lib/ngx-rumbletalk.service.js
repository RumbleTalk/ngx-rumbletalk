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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ydW1ibGV0YWxrLyIsInNvdXJjZXMiOlsibGliL25neC1ydW1ibGV0YWxrLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBS3JDLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFDL0IsWUFBb0IsSUFBZ0I7UUFBaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtJQUFHLENBQUM7Ozs7O0lBRXhDLE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixHQUFHLENBQVMsc0RBQXNELElBQUksRUFBRSxDQUFDO2FBQ3pFLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7OztZQVZGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQU5RLFVBQVU7Ozs7Ozs7O0lBUUwsb0NBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4UnVtYmxldGFsa1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQpIHt9XG5cbiAgYWRkcmVzcyhoYXNoOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8c3RyaW5nPihgaHR0cHM6Ly93d3cucnVtYmxldGFsay5jb20vY2xpZW50L3NlcnZpY2UucGhwP2hhc2g9JHtoYXNofWApXG4gICAgICAucGlwZShtYXAoZGF0YSA9PiBkYXRhWydhZGRyZXNzJ10pKTtcbiAgfVxufVxuIl19