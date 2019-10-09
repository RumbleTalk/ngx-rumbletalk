import { map } from 'rxjs/operators';
import { Injectable, NgModule, Component, Input, ChangeDetectionStrategy, ViewChild, defineInjectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

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
/** @type {?} */
var floatingToggleInterval;
var NgxRumbletalkComponent = /** @class */ (function () {
    function NgxRumbletalkComponent(service) {
        this.service = service;
        /**
         * @const Object different embedding types
         */
        this.EMBED_TYPES = {
            EMBEDDED: 0,
            FLOATING: 1,
            MOBILE_FULL: 2
        };
        this.counterTop = 14;
        this.counterLeft = 23;
    }
    /**
     * @return {?}
     */
    NgxRumbletalkComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var ua = navigator.userAgent.toUpperCase();
        this.mobile =
            ua.indexOf('MOBILE') !== -1 || ua.indexOf('ANDROID') !== -1 || ua.indexOf('IOS') !== -1;
        /* if web and embed type 2, treat as embedded (0) */
        if (!this.mobile && this.embedType === this.EMBED_TYPES.MOBILE_FULL) {
            this.embedType = this.EMBED_TYPES.EMBEDDED;
        }
        this.service.address(this.hash).subscribe((/**
         * @param {?} address
         * @return {?}
         */
        function (address) {
            server = address;
            if (!_this.mobile) {
                _this.iframeElement.nativeElement.src = "https://" + address + "/" + _this.hash + "/";
            }
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
    /**
     * @param {?} event
     * @return {?}
     */
    NgxRumbletalkComponent.prototype.handleImageLoad = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /* image element */
        /** @type {?} */
        var target = event.target;
        /* parent div */
        /** @type {?} */
        var parent = event.currentTarget.parentNode;
        /* match the dimensions of the image and the wrapping div */
        parent.style.height = target.height + "px";
        parent.style.width = target.width + "px";
        /* place the chat div right above the image */
        if (!this.mobile) {
            this.chatDivElement.nativeElement.style.bottom = target.height + "px";
        }
    };
    /**
     * hides or shows the floating chat
     * @param boolean [close] - if set to true, will force hide
     */
    /**
     * hides or shows the floating chat
     * @param {?=} close
     * @return {?}
     */
    NgxRumbletalkComponent.prototype.toggleFloatingChatStart = /**
     * hides or shows the floating chat
     * @param {?=} close
     * @return {?}
     */
    function (close) {
        var _this = this;
        if (close === void 0) { close = false; }
        clearInterval(floatingToggleInterval);
        /** @type {?} */
        var steps = -100;
        if (this.chatDivElement.nativeElement.style.visibility === 'hidden' && !close) {
            steps *= -1;
            this.chatDivElement.nativeElement.style.width = 0;
            this.chatDivElement.nativeElement.style.height = 0;
            this.chatDivElement.nativeElement.style.overflow = 'visible';
            this.chatDivElement.nativeElement.style.visibility = 'visible';
        }
        floatingToggleInterval = setInterval((/**
         * @return {?}
         */
        function () {
            _this.toggleFloatingChat(steps);
        }), 1);
    };
    /**
     * hide or display the floating chat by @steps
     * @param number steps - the number of pixels to increment the display by
     */
    /**
     * hide or display the floating chat by \@steps
     * @param {?} steps
     * @return {?}
     */
    NgxRumbletalkComponent.prototype.toggleFloatingChat = /**
     * hide or display the floating chat by \@steps
     * @param {?} steps
     * @return {?}
     */
    function (steps) {
        /** @type {?} */
        var chatDiv = this.chatDivElement.nativeElement;
        /** @type {?} */
        var width = chatDiv.offsetWidth + steps;
        /** @type {?} */
        var height = chatDiv.offsetHeight + steps;
        /** @type {?} */
        var check = 0;
        if (width < 0) {
            width = 0;
        }
        if (height < 0) {
            height = 0;
        }
        if (width >= 0 && height >= 0) {
            if (width <= this.width) {
                check = 1;
            }
            else {
                width = this.width;
            }
            if (height <= this.height) {
                check = 1;
            }
            else {
                height = this.height;
            }
            chatDiv.style.width = width + 'px';
            chatDiv.style.height = height + 'px';
        }
        if (!check || width <= 0 || height <= 0) {
            clearInterval(floatingToggleInterval);
            if (width < this.width) {
                chatDiv.style.visibility = 'hidden';
                chatDiv.style.overflow = 'hidden';
            }
        }
    };
    /**
     * attaches the open chat event to the given target
     * @param Element target
     */
    /**
     * attaches the open chat event to the given target
     * @return {?}
     */
    NgxRumbletalkComponent.prototype.openChat = /**
     * attaches the open chat event to the given target
     * @return {?}
     */
    function () {
        /** @type {?} */
        var link = baseWebUrl + "client/chat.php?" + this.hash;
        /** @type {?} */
        var iframeInterval;
        /** @type {?} */
        var iframe = this.iframeElement;
        if (iframe) {
            iframe.nativeElement.focus();
        }
        else {
            /** @type {?} */
            var tempIframe_1 = window.open(link);
            iframeInterval = setInterval((/**
             * @return {?}
             */
            function () {
                if (tempIframe_1.closed) {
                    clearInterval(iframeInterval);
                }
            }), 100);
        }
    };
    NgxRumbletalkComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-rumbletalk',
                    template: "<div\r\n  class=\"rumbletalk-embed\"\r\n  [ngStyle]=\"{ height: height + 'px' }\"\r\n  *ngIf=\"embedType === EMBED_TYPES.EMBEDDED\"\r\n>\r\n  <iframe\r\n    #iframe\r\n    frameBorder=\"0\"\r\n    allow=\"microphone; camera\"\r\n    allowtransparency=\"true\"\r\n    [ngStyle]=\"{ width: width + 'px' }\"\r\n  ></iframe>\r\n</div>\r\n\r\n<div\r\n  class=\"rumbletalk-floating\"\r\n  [ngClass]=\"{ 'rumbletalk-floating-right': side === 0, 'rumbletalk-floating-left': side !== 0 }\"\r\n  (click)=\"mobile ? openChat() : toggleFloatingChatStart()\"\r\n  *ngIf=\"embedType === EMBED_TYPES.FLOATING\"\r\n>\r\n  <img\r\n    alt=\"Click to join the conversation\"\r\n    title=\"Click to join the conversation\"\r\n    [src]=\"image\"\r\n    [ngClass]=\"{ right: side === 0, left: side !== 0 }\"\r\n    (load)=\"handleImageLoad($event)\"\r\n  />\r\n\r\n  <div\r\n    class=\"counter-div\"\r\n    [ngStyle]=\"{ top: counterTop + 'px', left: counterLeft + 'px' }\"\r\n    *ngIf=\"showDetails\"\r\n  >\r\n    <img alt=\"loading\" [src]=\"cdn + 'images/toolbar/mini_wait.gif'\" *ngIf=\"!mobile\" />\r\n  </div>\r\n\r\n  <div\r\n    #chatDiv\r\n    class=\"chat-div\"\r\n    [ngClass]=\"{ 'chat-div-left': side !== 0, 'chat-div-right': side === 0 }\"\r\n    style=\"visibility: hidden\"\r\n    *ngIf=\"!mobile\"\r\n  >\r\n    <img\r\n      class=\"close-button\"\r\n      alt=\"close\"\r\n      [src]=\"cdn + 'images/c.png'\"\r\n      [ngStyle]=\"side === 0 ? { left: '-8px' } : { right: '-8px' }\"\r\n      (click)=\"toggleFloatingChatStart(true)\"\r\n    />\r\n\r\n    <iframe\r\n      #iframe\r\n      frameBorder=\"0\"\r\n      allow=\"microphone; camera\"\r\n      allowtransparency=\"true\"\r\n      [ngStyle]=\"{ width: width + 'px' }\"\r\n    ></iframe>\r\n  </div>\r\n</div>\r\n\r\n<div\r\n  class=\"rumbletalk-embed-image\"\r\n  (click)=\"openChat()\"\r\n  *ngIf=\"embedType === EMBED_TYPES.MOBILE_FULL\"\r\n>\r\n  <img\r\n    alt=\"Click here to join the chat\"\r\n    title=\"Click here to join the chat\"\r\n    role=\"link\"\r\n    [src]=\"cdn + 'images/mobile-redirect.png'\"\r\n  />\r\n\r\n  <h3 role=\"link\">Click here to join the chat</h3>\r\n</div>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".rumbletalk-embed{overflow:hidden}iframe{height:100%;overflow:hidden;background-color:transparent}.rumbletalk-floating{position:fixed;bottom:5px;z-index:2147483647;cursor:pointer}.rumbletalk-floating-left{left:5px}.rumbletalk-floating-right{right:5px}.rumbletalk-floating>img{max-width:none;position:absolute;bottom:0}.rumbletalk-floating>img.left{left:0}.rumbletalk-floating>img.right{right:0}.counter-div{position:absolute;width:28px;text-align:center;font:bold 12px arial;color:#000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.chat-div{position:absolute;bottom:75px;overflow:hidden;padding:0;height:0}.chat-div-left{left:0}.chat-div-right{right:0}.close-button{cursor:pointer;position:absolute;top:-9px}.rumbletalk-embed-image{text-align:center}.rumbletalk-embed-image img{cursor:pointer}"]
                }] }
    ];
    /** @nocollapse */
    NgxRumbletalkComponent.ctorParameters = function () { return [
        { type: NgxRumbletalkService }
    ]; };
    NgxRumbletalkComponent.propDecorators = {
        iframeElement: [{ type: ViewChild, args: ['iframe',] }],
        chatDivElement: [{ type: ViewChild, args: ['chatDiv',] }],
        hash: [{ type: Input }],
        side: [{ type: Input }],
        embedType: [{ type: Input }],
        cdn: [{ type: Input }],
        floating: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        bounce: [{ type: Input }],
        image: [{ type: Input }],
        showDetails: [{ type: Input }]
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
                    imports: [HttpClientModule, BrowserModule],
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