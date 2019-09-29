/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
var NgxRumbletalkService = /** @class */ (function () {
    function NgxRumbletalkService(http) {
        this.http = http;
    }
    /**
     * @param {?} hash
     * @return {?}
     */
    NgxRumbletalkService.prototype.address = /**
     * @param {?} hash
     * @return {?}
     */
    function (hash) {
        return this.http
            .get("https://www.rumbletalk.com/client/service.php?hash=" + hash)
            .pipe(map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return data['address']; })));
    };
    NgxRumbletalkService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxRumbletalkService.ctorParameters = function () { return [
        { type: HttpClient }
    ]; };
    /** @nocollapse */ NgxRumbletalkService.ngInjectableDef = i0.defineInjectable({ factory: function NgxRumbletalkService_Factory() { return new NgxRumbletalkService(i0.inject(i1.HttpClient)); }, token: NgxRumbletalkService, providedIn: "root" });
    return NgxRumbletalkService;
}());
export { NgxRumbletalkService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxRumbletalkService.prototype.http;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ydW1ibGV0YWxrLyIsInNvdXJjZXMiOlsibGliL25neC1ydW1ibGV0YWxrLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWxELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRXJDO0lBSUUsOEJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7SUFBRyxDQUFDOzs7OztJQUV4QyxzQ0FBTzs7OztJQUFQLFVBQVEsSUFBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFTLHdEQUFzRCxJQUFNLENBQUM7YUFDekUsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBZixDQUFlLEVBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O2dCQVZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBTlEsVUFBVTs7OytCQURuQjtDQWdCQyxBQVhELElBV0M7U0FSWSxvQkFBb0I7Ozs7OztJQUNuQixvQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hSdW1ibGV0YWxrU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge31cblxuICBhZGRyZXNzKGhhc2g6IHN0cmluZyk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxzdHJpbmc+KGBodHRwczovL3d3dy5ydW1ibGV0YWxrLmNvbS9jbGllbnQvc2VydmljZS5waHA/aGFzaD0ke2hhc2h9YClcbiAgICAgIC5waXBlKG1hcChkYXRhID0+IGRhdGFbJ2FkZHJlc3MnXSkpO1xuICB9XG59XG4iXX0=