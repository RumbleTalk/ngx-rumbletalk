import { map } from 'rxjs/operators';
import { Injectable, NgModule, defineInjectable, inject, Component, ChangeDetectionStrategy, ViewChild, Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxRumbletalkService {
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
/** @nocollapse */ NgxRumbletalkService.ngInjectableDef = defineInjectable({ factory: function NgxRumbletalkService_Factory() { return new NgxRumbletalkService(inject(HttpClient)); }, token: NgxRumbletalkService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const protocol = 'https://';
/** @type {?} */
const baseWebUrl = 'https://www.rumbletalk.com/';
/** @type {?} */
const serviceRelativeUrl = 'client/service.php?hash=';
/** @type {?} */
let server;
/** @type {?} */
let messageInterval;
class NgxRumbletalkComponent {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.service.address(this.hash).subscribe((/**
         * @param {?} address
         * @return {?}
         */
        address => {
            server = address;
            this.iframeElement.nativeElement.src = `https://${address}/${this.hash}/`;
            this.addListeners();
            this.instantiateQuery();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        clearInterval(messageInterval);
    }
    /**
     * add the event listeners based on the embed type and device
     * @return {?}
     */
    addListeners() {
        window.addEventListener('message', this.info.bind(this), false);
    }
    /**
     * handles postMessage requests
     * @param {?} event - the event object
     * @return {?}
     */
    info(event) {
        if (isFinite(event.data)) {
            clearInterval(messageInterval);
        }
        else if (typeof event.data === 'object') {
            if (event.data.reload) {
                this.reload();
            }
        }
    }
    /**
     * reloads the iframe (or parent page) in case of a server request
     * @return {?}
     */
    reload() {
        /** @type {?} */
        const url = `${baseWebUrl}${serviceRelativeUrl}${this.hash}`;
        this.service.reload(url).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res.status) {
                server = res.address;
                /** @type {?} */
                const address = `${protocol}${server}/${this.hash}/`;
                if (this.iframeElement.nativeElement instanceof HTMLIFrameElement) {
                    this.iframeElement.nativeElement.src = address;
                }
                else {
                    this.iframeElement.nativeElement.location.href = address;
                }
                this.instantiateQuery();
            }
        }), (/**
         * @param {?} ignore
         * @return {?}
         */
        ignore => location.reload()));
    }
    /**
     * starts [repeatedly] trying to connect to the chat using postMessage
     * @return {?}
     */
    instantiateQuery() {
        messageInterval = setInterval(this.query.bind(this), 1000);
    }
    /**
     * instantiate a postMessage connection with the chat
     * @return {?}
     */
    query() {
        try {
            /** @type {?} */
            let target;
            /** @type {?} */
            let origin;
            if (this.iframeElement.nativeElement instanceof HTMLIFrameElement) {
                target = this.iframeElement.nativeElement.contentWindow;
                origin = protocol + server;
            }
            else {
                target = this.iframeElement.nativeElement;
                origin = baseWebUrl;
            }
            target.postMessage('toolbar', origin);
        }
        catch (ignore) { }
    }
    /**
     * checks if the given origin is of a chat service
     * @param {?} origin - the URL of the origin
     * returns boolean
     * @return {?}
     */
    validateOrigin(origin) {
        return /^https:\/\/.+\.rumbletalk\.(net|com)(:4433)?$/.test(origin);
    }
}
NgxRumbletalkComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-rumbletalk',
                template: "<iframe\r\n  #iframe\r\n  allowtransparency=\"true\"\r\n  allow=\"microphone; camera\"\r\n  [width]=\"width\"\r\n  [height]=\"height\"\r\n></iframe>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["iframe{border:0;width:100%;height:100%;background-color:transparent;overflow:hidden}"]
            }] }
];
/** @nocollapse */
NgxRumbletalkComponent.ctorParameters = () => [
    { type: NgxRumbletalkService }
];
NgxRumbletalkComponent.propDecorators = {
    iframeElement: [{ type: ViewChild, args: ['iframe',] }],
    floating: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    hash: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxRumbletalkModule {
}
NgxRumbletalkModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxRumbletalkComponent],
                imports: [HttpClientModule],
                exports: [NgxRumbletalkComponent]
            },] }
];

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