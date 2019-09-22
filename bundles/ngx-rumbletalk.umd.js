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
    /** @type {?} */
    var protocol = 'https://';
    /** @type {?} */
    var baseWebUrl = 'https://www.rumbletalk.com/';
    /** @type {?} */
    var serviceRelativeUrl = 'client/service.php?hash=';
    /** @type {?} */
    var server = 'stagging5.rumbletalk.net:4433';
    /** @type {?} */
    var messageInterval;
    var NgxRumbletalkComponent = /** @class */ (function () {
        function NgxRumbletalkComponent(sanitizer) {
            var _this = this;
            this.sanitizer = sanitizer;
            /**
             * handles postMessage requests
             * @param event - the event object
             */
            this.info = ( /**
             * @param {?} event
             * @return {?}
             */function (event) {
                if (isFinite(event.data)) {
                    clearInterval(messageInterval);
                }
                else if (typeof event.data === 'object') {
                    if (event.data.reload) {
                        _this.reload();
                    }
                }
            });
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
            function () {
                this.addListeners();
                this.instantiateQuery();
            };
        /**
         * add the event listeners based on the embed type and device
         */
        /**
         * add the event listeners based on the embed type and device
         * @return {?}
         */
        NgxRumbletalkComponent.prototype.addListeners = /**
         * add the event listeners based on the embed type and device
         * @return {?}
         */
            function () {
                window.addEventListener('message', this.info, false);
            };
        /**
         * reloads the iframe (or parent page) in case of a server request
         */
        /**
         * reloads the iframe (or parent page) in case of a server request
         * @return {?}
         */
        NgxRumbletalkComponent.prototype.reload = /**
         * reloads the iframe (or parent page) in case of a server request
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var xhr = new XMLHttpRequest();
                xhr.open('GET', baseWebUrl + serviceRelativeUrl + this.hash, true);
                xhr.onreadystatechange = ( /**
                 * @return {?}
                 */function () {
                    if (xhr.readyState !== 4) {
                        return;
                    }
                    try {
                        /** @type {?} */
                        var response = JSON.parse(xhr.responseText);
                        if (response.status) {
                            server = response.address;
                            /** @type {?} */
                            var address = protocol + server + '/' + _this.hash + '/';
                            if (_this.iframeElement.nativeElement instanceof HTMLIFrameElement) {
                                _this.iframeElement.nativeElement.src = address;
                            }
                            else {
                                _this.iframeElement.nativeElement.location.href = address;
                            }
                            _this.instantiateQuery();
                        }
                    }
                    catch (e) {
                        location.reload();
                    }
                });
                xhr.send();
            };
        /**
         * starts [repeatedly] trying to connect to the chat using postMessage
         */
        /**
         * starts [repeatedly] trying to connect to the chat using postMessage
         * @return {?}
         */
        NgxRumbletalkComponent.prototype.instantiateQuery = /**
         * starts [repeatedly] trying to connect to the chat using postMessage
         * @return {?}
         */
            function () {
                var _this = this;
                messageInterval = setInterval(( /**
                 * @return {?}
                 */function () {
                    _this.query();
                }), 1000);
            };
        /**
         * instantiate a postMessage connection with the chat
         */
        /**
         * instantiate a postMessage connection with the chat
         * @return {?}
         */
        NgxRumbletalkComponent.prototype.query = /**
         * instantiate a postMessage connection with the chat
         * @return {?}
         */
            function () {
                try {
                    /** @type {?} */
                    var target = void 0;
                    /** @type {?} */
                    var origin_1;
                    if (this.iframeElement.nativeElement instanceof HTMLIFrameElement) {
                        target = this.iframeElement.nativeElement.contentWindow;
                        origin_1 = protocol + server;
                    }
                    else {
                        target = this.iframeElement.nativeElement;
                        origin_1 = baseWebUrl;
                    }
                    target.postMessage('toolbar', origin_1);
                }
                catch (ignore) { }
            };
        /**
         * checks if the given origin is of a chat service
         * @param origin - the URL of the origin
         * returns boolean
         */
        /**
         * checks if the given origin is of a chat service
         * @param {?} origin - the URL of the origin
         * returns boolean
         * @return {?}
         */
        NgxRumbletalkComponent.prototype.validateOrigin = /**
         * checks if the given origin is of a chat service
         * @param {?} origin - the URL of the origin
         * returns boolean
         * @return {?}
         */
            function (origin) {
                return /^https:\/\/.+\.rumbletalk\.(net|com)(:4433)?$/.test(origin);
            };
        NgxRumbletalkComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ngx-rumbletalk',
                        template: "<iframe\r\n  #iframe\r\n  allowtransparency=\"true\"\r\n  allow=\"microphone; camera\"\r\n  [src]=\"safeSrc\"\r\n  [width]=\"width\"\r\n  [height]=\"height\"\r\n></iframe>\r\n",
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
            iframeElement: [{ type: i0.ViewChild, args: ['iframe',] }],
            src: [{ type: i0.Input }],
            floating: [{ type: i0.Input }],
            width: [{ type: i0.Input }],
            height: [{ type: i0.Input }],
            hash: [{ type: i0.Input }]
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