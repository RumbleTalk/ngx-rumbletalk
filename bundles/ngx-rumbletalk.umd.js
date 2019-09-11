(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/platform-browser'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-rumbletalk', ['exports', '@angular/platform-browser', '@angular/core'], factory) :
    (factory((global['ngx-rumbletalk'] = {}),global.ng.platformBrowser,global.ng.core));
}(this, (function (exports,platformBrowser,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxRumbletalkService = /** @class */ (function () {
        function NgxRumbletalkService() {
        }
        NgxRumbletalkService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NgxRumbletalkService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxRumbletalkService.ngInjectableDef = i0.defineInjectable({ factory: function NgxRumbletalkService_Factory() { return new NgxRumbletalkService(); }, token: NgxRumbletalkService, providedIn: "root" });
        return NgxRumbletalkService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxRumbletalkComponent = /** @class */ (function () {
        function NgxRumbletalkComponent(sanitizer) {
            this.sanitizer = sanitizer;
        }
        Object.defineProperty(NgxRumbletalkComponent.prototype, "safeSrc", {
            get: /**
             * @return {?}
             */ function () {
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
            { type: i0.Component, args: [{
                        selector: 'ngx-rumbletalk',
                        template: "<iframe\r\n  [src]=\"safeSrc\"\r\n  allowtransparency=\"true\"\r\n  allow=\"microphone; camera\"\r\n  [width]=\"width\"\r\n  [height]=\"height\"\r\n></iframe>\r\n",
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        styles: ["iframe{border:0;width:100%;height:100%;background-color:transparent;overflow:hidden}"]
                    }] }
        ];
        /** @nocollapse */
        NgxRumbletalkComponent.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer }
            ];
        };
        NgxRumbletalkComponent.propDecorators = {
            src: [{ type: i0.Input }],
            floating: [{ type: i0.Input }],
            width: [{ type: i0.Input }],
            height: [{ type: i0.Input }]
        };
        return NgxRumbletalkComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxRumbletalkModule = /** @class */ (function () {
        function NgxRumbletalkModule() {
        }
        NgxRumbletalkModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [NgxRumbletalkComponent],
                        imports: [],
                        exports: [NgxRumbletalkComponent]
                    },] }
        ];
        return NgxRumbletalkModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgxRumbletalkService = NgxRumbletalkService;
    exports.NgxRumbletalkComponent = NgxRumbletalkComponent;
    exports.NgxRumbletalkModule = NgxRumbletalkModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-rumbletalk.umd.js.map