import { map } from 'rxjs/operators';
import { Injectable, NgModule, defineInjectable, inject, Component, ChangeDetectionStrategy, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    /**
     * @param {?} url
     * @return {?}
     */
    NgxRumbletalkService.prototype.reload = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return this.http.get(url);
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
    /** @nocollapse */ NgxRumbletalkService.ngInjectableDef = defineInjectable({ factory: function NgxRumbletalkService_Factory() { return new NgxRumbletalkService(inject(HttpClient)); }, token: NgxRumbletalkService, providedIn: "root" });
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
var server;
/** @type {?} */
var messageInterval;
var NgxRumbletalkComponent = /** @class */ (function () {
    function NgxRumbletalkComponent(service) {
        this.service = service;
    }
    /**
     * @return {?}
     */
    NgxRumbletalkComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.service.address(this.hash).subscribe((/**
         * @param {?} address
         * @return {?}
         */
        function (address) {
            server = address;
            _this.iframeElement.nativeElement.src = "https://" + address + "/" + _this.hash + "/";
            _this.addListeners();
            _this.instantiateQuery();
        }));
    };
    /**
     * @return {?}
     */
    NgxRumbletalkComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        clearInterval(messageInterval);
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
        window.addEventListener('message', this.info.bind(this), false);
    };
    /**
     * handles postMessage requests
     * @param event - the event object
     */
    /**
     * handles postMessage requests
     * @param {?} event - the event object
     * @return {?}
     */
    NgxRumbletalkComponent.prototype.info = /**
     * handles postMessage requests
     * @param {?} event - the event object
     * @return {?}
     */
    function (event) {
        if (isFinite(event.data)) {
            clearInterval(messageInterval);
        }
        else if (typeof event.data === 'object') {
            if (event.data.reload) {
                this.reload();
            }
        }
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
        var url = "" + baseWebUrl + serviceRelativeUrl + this.hash;
        this.service.reload(url).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.status) {
                server = res.address;
                /** @type {?} */
                var address = "" + protocol + server + "/" + _this.hash + "/";
                if (_this.iframeElement.nativeElement instanceof HTMLIFrameElement) {
                    _this.iframeElement.nativeElement.src = address;
                }
                else {
                    _this.iframeElement.nativeElement.location.href = address;
                }
                _this.instantiateQuery();
            }
        }), (/**
         * @param {?} ignore
         * @return {?}
         */
        function (ignore) { return location.reload(); }));
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
        messageInterval = setInterval(this.query.bind(this), 1000);
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
        { type: Component, args: [{
                    selector: 'ngx-rumbletalk',
                    template: "<iframe\r\n  #iframe\r\n  allowtransparency=\"true\"\r\n  allow=\"microphone; camera\"\r\n  [width]=\"width\"\r\n  [height]=\"height\"\r\n></iframe>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["iframe{border:0;width:100%;height:100%;background-color:transparent;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    NgxRumbletalkComponent.ctorParameters = function () { return [
        { type: NgxRumbletalkService }
    ]; };
    NgxRumbletalkComponent.propDecorators = {
        iframeElement: [{ type: ViewChild, args: ['iframe',] }],
        floating: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        hash: [{ type: Input }]
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
        { type: NgModule, args: [{
                    declarations: [NgxRumbletalkComponent],
                    imports: [HttpClientModule],
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

export { NgxRumbletalkService, NgxRumbletalkComponent, NgxRumbletalkModule };

//# sourceMappingURL=ngx-rumbletalk.js.map