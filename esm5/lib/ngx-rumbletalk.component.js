/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { NgxRumbletalkService } from './ngx-rumbletalk.service';
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
                    template: "<div\r\n  class=\"rumbletalk-embed\"\r\n  [ngStyle]=\"{ height: height ? height + 'px' : '100%' }\"\r\n  *ngIf=\"embedType === EMBED_TYPES.EMBEDDED\"\r\n>\r\n  <iframe\r\n    #iframe\r\n    frameBorder=\"0\"\r\n    allow=\"microphone; camera\"\r\n    allowtransparency=\"true\"\r\n    [ngStyle]=\"{ width: width ? width + 'px' : '100%' }\"\r\n  ></iframe>\r\n</div>\r\n\r\n<div\r\n  class=\"rumbletalk-floating\"\r\n  [ngClass]=\"{ 'rumbletalk-floating-right': side === 0, 'rumbletalk-floating-left': side !== 0 }\"\r\n  (click)=\"mobile ? openChat() : toggleFloatingChatStart()\"\r\n  *ngIf=\"embedType === EMBED_TYPES.FLOATING\"\r\n>\r\n  <img\r\n    alt=\"Click to join the conversation\"\r\n    title=\"Click to join the conversation\"\r\n    [src]=\"image\"\r\n    [ngClass]=\"{ right: side === 0, left: side !== 0 }\"\r\n    (load)=\"handleImageLoad($event)\"\r\n  />\r\n\r\n  <div\r\n    class=\"counter-div\"\r\n    [ngStyle]=\"{ top: counterTop + 'px', left: counterLeft + 'px' }\"\r\n    *ngIf=\"showDetails\"\r\n  >\r\n    <img alt=\"loading\" [src]=\"cdn + 'images/toolbar/mini_wait.gif'\" *ngIf=\"!mobile\" />\r\n  </div>\r\n\r\n  <div\r\n    #chatDiv\r\n    class=\"chat-div\"\r\n    [ngClass]=\"{ 'chat-div-left': side !== 0, 'chat-div-right': side === 0 }\"\r\n    style=\"visibility: hidden\"\r\n    *ngIf=\"!mobile\"\r\n  >\r\n    <img\r\n      class=\"close-button\"\r\n      alt=\"close\"\r\n      [src]=\"cdn + 'images/c.png'\"\r\n      [ngStyle]=\"side === 0 ? { left: '-8px' } : { right: '-8px' }\"\r\n      (click)=\"toggleFloatingChatStart(true)\"\r\n    />\r\n\r\n    <iframe\r\n      #iframe\r\n      frameBorder=\"0\"\r\n      allow=\"microphone; camera\"\r\n      allowtransparency=\"true\"\r\n      [ngStyle]=\"{ width: width ? width + 'px' : '100%' }\"\r\n    ></iframe>\r\n  </div>\r\n</div>\r\n\r\n<div\r\n  class=\"rumbletalk-embed-image\"\r\n  (click)=\"openChat()\"\r\n  *ngIf=\"embedType === EMBED_TYPES.MOBILE_FULL\"\r\n>\r\n  <img\r\n    alt=\"Click here to join the chat\"\r\n    title=\"Click here to join the chat\"\r\n    role=\"link\"\r\n    [src]=\"cdn + 'images/mobile-redirect.png'\"\r\n  />\r\n\r\n  <h3 role=\"link\">Click here to join the chat</h3>\r\n</div>\r\n",
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
export { NgxRumbletalkComponent };
if (false) {
    /**
     * @const Object different embedding types
     * @type {?}
     */
    NgxRumbletalkComponent.prototype.EMBED_TYPES;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.counterTop;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.counterLeft;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.iframeElement;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.chatDivElement;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.hash;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.side;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.embedType;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.cdn;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.floating;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.width;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.height;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.bounce;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.image;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.showDetails;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.mobile;
    /**
     * @type {?}
     * @private
     */
    NgxRumbletalkComponent.prototype.service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJ1bWJsZXRhbGsvIiwic291cmNlcyI6WyJsaWIvbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUFFMUQsUUFBUSxHQUFHLFVBQVU7O0lBQ3JCLFVBQVUsR0FBRyw2QkFBNkI7O0lBQzFDLGtCQUFrQixHQUFHLDBCQUEwQjs7SUFDakQsTUFBYzs7SUFDZCxlQUFvQjs7SUFDcEIsc0JBQTJCO0FBRS9CO0lBK0JFLGdDQUFvQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjs7OztRQXZCeEMsZ0JBQVcsR0FBRztZQUNyQixRQUFRLEVBQUUsQ0FBQztZQUNYLFFBQVEsRUFBRSxDQUFDO1lBQ1gsV0FBVyxFQUFFLENBQUM7U0FDZixDQUFDO1FBQ08sZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnQkFBVyxHQUFHLEVBQUUsQ0FBQztJQWlCMEIsQ0FBQzs7OztJQUVyRCx5Q0FBUTs7O0lBQVI7UUFBQSxpQkFvQkM7O1lBbkJPLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUM1QyxJQUFJLENBQUMsTUFBTTtZQUNULEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTFGLG9EQUFvRDtRQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFD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WUFBVSxDQUFDLE1BQU0sRUFBRTtvQkFDckIsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUMvQjtZQUNILENBQUMsR0FBRSxHQUFHLENBQUMsQ0FBQztTQUNUO0lBQ0gsQ0FBQzs7Z0JBalBGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixnckVBQThDO29CQUU5QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2hEOzs7O2dCQWRRLG9CQUFvQjs7O2dDQXlCMUIsU0FBUyxTQUFDLFFBQVE7aUNBQ2xCLFNBQVMsU0FBQyxTQUFTO3VCQUNuQixLQUFLO3VCQUNMLEtBQUs7NEJBQ0wsS0FBSztzQkFDTCxLQUFLOzJCQUNMLEtBQUs7d0JBQ0wsS0FBSzt5QkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzs4QkFDTCxLQUFLOztJQXVOUiw2QkFBQztDQUFBLEFBbFBELElBa1BDO1NBNU9ZLHNCQUFzQjs7Ozs7O0lBRWpDLDZDQUlFOztJQUNGLDRDQUF5Qjs7SUFDekIsNkNBQTBCOztJQUUxQiwrQ0FBK0M7O0lBQy9DLGdEQUFpRDs7SUFDakQsc0NBQTZCOztJQUM3QixzQ0FBNkI7O0lBQzdCLDJDQUFrQzs7SUFDbEMscUNBQTRCOztJQUM1QiwwQ0FBa0M7O0lBQ2xDLHVDQUE4Qjs7SUFDOUIsd0NBQStCOztJQUMvQix3Q0FBK0I7O0lBQy9CLHVDQUE4Qjs7SUFDOUIsNkNBQXFDOztJQUVyQyx3Q0FBZ0I7Ozs7O0lBRUoseUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hSdW1ibGV0YWxrU2VydmljZSB9IGZyb20gJy4vbmd4LXJ1bWJsZXRhbGsuc2VydmljZSc7XG5cbmNvbnN0IHByb3RvY29sID0gJ2h0dHBzOi8vJztcbmNvbnN0IGJhc2VXZWJVcmwgPSAnaHR0cHM6Ly93d3cucnVtYmxldGFsay5jb20vJztcbmNvbnN0IHNlcnZpY2VSZWxhdGl2ZVVybCA9ICdjbGllbnQvc2VydmljZS5waHA/aGFzaD0nO1xubGV0IHNlcnZlcjogc3RyaW5nO1xubGV0IG1lc3NhZ2VJbnRlcnZhbDogYW55O1xubGV0IGZsb2F0aW5nVG9nZ2xlSW50ZXJ2YWw6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXJ1bWJsZXRhbGsnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtcnVtYmxldGFsay5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neFJ1bWJsZXRhbGtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKiBAY29uc3QgT2JqZWN0IGRpZmZlcmVudCBlbWJlZGRpbmcgdHlwZXMgKi9cbiAgcmVhZG9ubHkgRU1CRURfVFlQRVMgPSB7XG4gICAgRU1CRURERUQ6IDAsXG4gICAgRkxPQVRJTkc6IDEsXG4gICAgTU9CSUxFX0ZVTEw6IDJcbiAgfTtcbiAgcmVhZG9ubHkgY291bnRlclRvcCA9IDE0O1xuICByZWFkb25seSBjb3VudGVyTGVmdCA9IDIzO1xuXG4gIEBWaWV3Q2hpbGQoJ2lmcmFtZScpIGlmcmFtZUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NoYXREaXYnKSBjaGF0RGl2RWxlbWVudDogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgcHVibGljIGhhc2g6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHNpZGU6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIGVtYmVkVHlwZTogbnVtYmVyO1xuICBASW5wdXQoKSBwdWJsaWMgY2RuOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBmbG9hdGluZzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIHdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIHB1YmxpYyBoZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIGJvdW5jZTogbnVtYmVyO1xuICBASW5wdXQoKSBwdWJsaWMgaW1hZ2U6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIHNob3dEZXRhaWxzOiBib29sZWFuO1xuXG4gIG1vYmlsZTogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IE5neFJ1bWJsZXRhbGtTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b1VwcGVyQ2FzZSgpO1xuICAgIHRoaXMubW9iaWxlID1cbiAgICAgIHVhLmluZGV4T2YoJ01PQklMRScpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdBTkRST0lEJykgIT09IC0xIHx8IHVhLmluZGV4T2YoJ0lPUycpICE9PSAtMTtcblxuICAgIC8qIGlmIHdlYiBhbmQgZW1iZWQgdHlwZSAyLCB0cmVhdCBhcyBlbWJlZGRlZCAoMCkgKi9cbiAgICBpZiAoIXRoaXMubW9iaWxlICYmIHRoaXMuZW1iZWRUeXBlID09PSB0aGlzLkVNQkVEX1RZUEVTLk1PQklMRV9GVUxMKSB7XG4gICAgICB0aGlzLmVtYmVkVHlwZSA9IHRoaXMuRU1CRURfVFlQRVMuRU1CRURERUQ7XG4gICAgfVxuXG4gICAgdGhpcy5zZXJ2aWNlLmFkZHJlc3ModGhpcy5oYXNoKS5zdWJzY3JpYmUoYWRkcmVzcyA9PiB7XG4gICAgICBzZXJ2ZXIgPSBhZGRyZXNzO1xuXG4gICAgICBpZiAoIXRoaXMubW9iaWxlKSB7XG4gICAgICAgIHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9IGBodHRwczovLyR7YWRkcmVzc30vJHt0aGlzLmhhc2h9L2A7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWRkTGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLmluc3RhbnRpYXRlUXVlcnkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNsZWFySW50ZXJ2YWwobWVzc2FnZUludGVydmFsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIGV2ZW50IGxpc3RlbmVycyBiYXNlZCBvbiB0aGUgZW1iZWQgdHlwZSBhbmQgZGV2aWNlXG4gICAqL1xuICBhZGRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmluZm8uYmluZCh0aGlzKSwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXMgcG9zdE1lc3NhZ2UgcmVxdWVzdHNcbiAgICogQHBhcmFtIGV2ZW50IC0gdGhlIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgaW5mbyhldmVudCkge1xuICAgIGlmIChpc0Zpbml0ZShldmVudC5kYXRhKSkge1xuICAgICAgY2xlYXJJbnRlcnZhbChtZXNzYWdlSW50ZXJ2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV2ZW50LmRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoZXZlbnQuZGF0YS5yZWxvYWQpIHtcbiAgICAgICAgdGhpcy5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVsb2FkcyB0aGUgaWZyYW1lIChvciBwYXJlbnQgcGFnZSkgaW4gY2FzZSBvZiBhIHNlcnZlciByZXF1ZXN0XG4gICAqL1xuICByZWxvYWQoKSB7XG4gICAgY29uc3QgdXJsID0gYCR7YmFzZVdlYlVybH0ke3NlcnZpY2VSZWxhdGl2ZVVybH0ke3RoaXMuaGFzaH1gO1xuXG4gICAgdGhpcy5zZXJ2aWNlLnJlbG9hZCh1cmwpLnN1YnNjcmliZShcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzKSB7XG4gICAgICAgICAgc2VydmVyID0gcmVzLmFkZHJlc3M7XG4gICAgICAgICAgY29uc3QgYWRkcmVzcyA9IGAke3Byb3RvY29sfSR7c2VydmVyfS8ke3RoaXMuaGFzaH0vYDtcblxuICAgICAgICAgIGlmICh0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudC5zcmMgPSBhZGRyZXNzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudC5sb2NhdGlvbi5ocmVmID0gYWRkcmVzcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmluc3RhbnRpYXRlUXVlcnkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlnbm9yZSA9PiBsb2NhdGlvbi5yZWxvYWQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnRzIFtyZXBlYXRlZGx5XSB0cnlpbmcgdG8gY29ubmVjdCB0byB0aGUgY2hhdCB1c2luZyBwb3N0TWVzc2FnZVxuICAgKi9cbiAgaW5zdGFudGlhdGVRdWVyeSgpIHtcbiAgICBtZXNzYWdlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnF1ZXJ5LmJpbmQodGhpcyksIDEwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIGluc3RhbnRpYXRlIGEgcG9zdE1lc3NhZ2UgY29ubmVjdGlvbiB3aXRoIHRoZSBjaGF0XG4gICAqL1xuICBxdWVyeSgpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHRhcmdldDtcbiAgICAgIGxldCBvcmlnaW47XG5cbiAgICAgIGlmICh0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRhcmdldCA9IHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRlbnRXaW5kb3c7XG4gICAgICAgIG9yaWdpbiA9IHByb3RvY29sICsgc2VydmVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIG9yaWdpbiA9IGJhc2VXZWJVcmw7XG4gICAgICB9XG5cbiAgICAgIHRhcmdldC5wb3N0TWVzc2FnZSgndG9vbGJhcicsIG9yaWdpbik7XG4gICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrcyBpZiB0aGUgZ2l2ZW4gb3JpZ2luIGlzIG9mIGEgY2hhdCBzZXJ2aWNlXG4gICAqIEBwYXJhbSBvcmlnaW4gLSB0aGUgVVJMIG9mIHRoZSBvcmlnaW5cbiAgICogcmV0dXJucyBib29sZWFuXG4gICAqL1xuICB2YWxpZGF0ZU9yaWdpbihvcmlnaW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gL15odHRwczpcXC9cXC8uK1xcLnJ1bWJsZXRhbGtcXC4obmV0fGNvbSkoOjQ0MzMpPyQvLnRlc3Qob3JpZ2luKTtcbiAgfVxuXG4gIGhhbmRsZUltYWdlTG9hZChldmVudDogYW55KTogdm9pZCB7XG4gICAgLyogaW1hZ2UgZWxlbWVudCAqL1xuICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAvKiBwYXJlbnQgZGl2ICovXG4gICAgY29uc3QgcGFyZW50ID0gZXZlbnQuY3VycmVudFRhcmdldC5wYXJlbnROb2RlO1xuXG4gICAgLyogbWF0Y2ggdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGltYWdlIGFuZCB0aGUgd3JhcHBpbmcgZGl2ICovXG4gICAgcGFyZW50LnN0eWxlLmhlaWdodCA9IGAke3RhcmdldC5oZWlnaHR9cHhgO1xuICAgIHBhcmVudC5zdHlsZS53aWR0aCA9IGAke3RhcmdldC53aWR0aH1weGA7XG5cbiAgICAvKiBwbGFjZSB0aGUgY2hhdCBkaXYgcmlnaHQgYWJvdmUgdGhlIGltYWdlICovXG4gICAgaWYgKCF0aGlzLm1vYmlsZSkge1xuICAgICAgdGhpcy5jaGF0RGl2RWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLmJvdHRvbSA9IGAke3RhcmdldC5oZWlnaHR9cHhgO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBoaWRlcyBvciBzaG93cyB0aGUgZmxvYXRpbmcgY2hhdFxuICAgKiBAcGFyYW0gYm9vbGVhbiBbY2xvc2VdIC0gaWYgc2V0IHRvIHRydWUsIHdpbGwgZm9yY2UgaGlkZVxuICAgKi9cbiAgdG9nZ2xlRmxvYXRpbmdDaGF0U3RhcnQoY2xvc2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGNsZWFySW50ZXJ2YWwoZmxvYXRpbmdUb2dnbGVJbnRlcnZhbCk7XG4gICAgbGV0IHN0ZXBzID0gLTEwMDtcblxuICAgIGlmICh0aGlzLmNoYXREaXZFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9PT0gJ2hpZGRlbicgJiYgIWNsb3NlKSB7XG4gICAgICBzdGVwcyAqPSAtMTtcbiAgICAgIHRoaXMuY2hhdERpdkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IDA7XG4gICAgICB0aGlzLmNoYXREaXZFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gMDtcbiAgICAgIHRoaXMuY2hhdERpdkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJztcbiAgICAgIHRoaXMuY2hhdERpdkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIH1cblxuICAgIGZsb2F0aW5nVG9nZ2xlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLnRvZ2dsZUZsb2F0aW5nQ2hhdChzdGVwcyk7XG4gICAgfSwgMSk7XG4gIH1cblxuICAvKipcbiAgICogaGlkZSBvciBkaXNwbGF5IHRoZSBmbG9hdGluZyBjaGF0IGJ5IEBzdGVwc1xuICAgKiBAcGFyYW0gbnVtYmVyIHN0ZXBzIC0gdGhlIG51bWJlciBvZiBwaXhlbHMgdG8gaW5jcmVtZW50IHRoZSBkaXNwbGF5IGJ5XG4gICAqL1xuICB0b2dnbGVGbG9hdGluZ0NoYXQoc3RlcHMpOiB2b2lkIHtcbiAgICBjb25zdCBjaGF0RGl2ID0gdGhpcy5jaGF0RGl2RWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIGxldCB3aWR0aCA9IGNoYXREaXYub2Zmc2V0V2lkdGggKyBzdGVwcztcbiAgICBsZXQgaGVpZ2h0ID0gY2hhdERpdi5vZmZzZXRIZWlnaHQgKyBzdGVwcztcbiAgICBsZXQgY2hlY2sgPSAwO1xuXG4gICAgaWYgKHdpZHRoIDwgMCkge1xuICAgICAgd2lkdGggPSAwO1xuICAgIH1cblxuICAgIGlmIChoZWlnaHQgPCAwKSB7XG4gICAgICBoZWlnaHQgPSAwO1xuICAgIH1cblxuICAgIGlmICh3aWR0aCA+PSAwICYmIGhlaWdodCA+PSAwKSB7XG4gICAgICBpZiAod2lkdGggPD0gdGhpcy53aWR0aCkge1xuICAgICAgICBjaGVjayA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICB9XG5cbiAgICAgIGlmIChoZWlnaHQgPD0gdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgY2hlY2sgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIGNoYXREaXYuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICBjaGF0RGl2LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgfVxuXG4gICAgaWYgKCFjaGVjayB8fCB3aWR0aCA8PSAwIHx8IGhlaWdodCA8PSAwKSB7XG4gICAgICBjbGVhckludGVydmFsKGZsb2F0aW5nVG9nZ2xlSW50ZXJ2YWwpO1xuICAgICAgaWYgKHdpZHRoIDwgdGhpcy53aWR0aCkge1xuICAgICAgICBjaGF0RGl2LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgY2hhdERpdi5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhdHRhY2hlcyB0aGUgb3BlbiBjaGF0IGV2ZW50IHRvIHRoZSBnaXZlbiB0YXJnZXRcbiAgICogQHBhcmFtIEVsZW1lbnQgdGFyZ2V0XG4gICAqL1xuICBvcGVuQ2hhdCgpOiB2b2lkIHtcbiAgICBjb25zdCBsaW5rID0gYCR7YmFzZVdlYlVybH1jbGllbnQvY2hhdC5waHA/JHt0aGlzLmhhc2h9YDtcbiAgICBsZXQgaWZyYW1lSW50ZXJ2YWw7XG4gICAgY29uc3QgaWZyYW1lID0gdGhpcy5pZnJhbWVFbGVtZW50O1xuXG4gICAgaWYgKGlmcmFtZSkge1xuICAgICAgaWZyYW1lLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdGVtcElmcmFtZSA9IHdpbmRvdy5vcGVuKGxpbmspO1xuICAgICAgaWZyYW1lSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICh0ZW1wSWZyYW1lLmNsb3NlZCkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaWZyYW1lSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9LCAxMDApO1xuICAgIH1cbiAgfVxufVxuIl19