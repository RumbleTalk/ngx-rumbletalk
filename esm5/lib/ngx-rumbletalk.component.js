/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
var NgxRumbletalkComponent = /** @class */ (function () {
    function NgxRumbletalkComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    Object.defineProperty(NgxRumbletalkComponent.prototype, "safeSrc", {
        get: /**
         * @return {?}
         */
        function () {
            return this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgxRumbletalkComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    NgxRumbletalkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-rumbletalk',
                    template: "<iframe\r\n  [src]=\"safeSrc\"\r\n  allowtransparency=\"true\"\r\n  allow=\"microphone; camera\"\r\n  [width]=\"width\"\r\n  [height]=\"height\"\r\n></iframe>\r\n",
                    styles: ["iframe{border:0;width:100%;height:100%;background-color:transparent;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    NgxRumbletalkComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    NgxRumbletalkComponent.propDecorators = {
        src: [{ type: Input }],
        floating: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }]
    };
    return NgxRumbletalkComponent;
}());
export { NgxRumbletalkComponent };
if (false) {
    /** @type {?} */
    NgxRumbletalkComponent.prototype.src;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.floating;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.width;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.height;
    /**
     * @type {?}
     * @private
     */
    NgxRumbletalkComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJ1bWJsZXRhbGsvIiwic291cmNlcyI6WyJsaWIvbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQ7SUFXRSxnQ0FBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFFL0Msc0JBQUksMkNBQU87Ozs7UUFBWDtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakUsQ0FBQzs7O09BQUE7Ozs7SUFFRCx5Q0FBUTs7O0lBQVIsY0FBWSxDQUFDOztnQkFqQmQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLDhLQUE4Qzs7aUJBRS9DOzs7O2dCQU5RLFlBQVk7OztzQkFRbEIsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7eUJBQ0wsS0FBSzs7SUFTUiw2QkFBQztDQUFBLEFBbEJELElBa0JDO1NBYlksc0JBQXNCOzs7SUFDakMscUNBQTRCOztJQUM1QiwwQ0FBa0M7O0lBQ2xDLHVDQUE4Qjs7SUFDOUIsd0NBQStCOzs7OztJQUVuQiwyQ0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtcnVtYmxldGFsaycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtcnVtYmxldGFsay5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1ydW1ibGV0YWxrLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hSdW1ibGV0YWxrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcHVibGljIHNyYzogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZmxvYXRpbmc6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBnZXQgc2FmZVNyYygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodGhpcy5zcmMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7fVxufVxuIl19