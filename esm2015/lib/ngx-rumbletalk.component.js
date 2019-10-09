/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { NgxRumbletalkService } from './ngx-rumbletalk.service';
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
/** @type {?} */
let floatingToggleInterval;
export class NgxRumbletalkComponent {
    /**
     * @param {?} service
     */
    constructor(service) {
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
    ngOnInit() {
        /** @type {?} */
        const ua = navigator.userAgent.toUpperCase();
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
        address => {
            server = address;
            if (!this.mobile) {
                this.iframeElement.nativeElement.src = `https://${address}/${this.hash}/`;
            }
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
    /**
     * @param {?} event
     * @return {?}
     */
    handleImageLoad(event) {
        /* image element */
        /** @type {?} */
        const target = event.target;
        /* parent div */
        /** @type {?} */
        const parent = event.currentTarget.parentNode;
        /* match the dimensions of the image and the wrapping div */
        parent.style.height = `${target.height}px`;
        parent.style.width = `${target.width}px`;
        /* place the chat div right above the image */
        if (!this.mobile) {
            this.chatDivElement.nativeElement.style.bottom = `${target.height}px`;
        }
    }
    /**
     * hides or shows the floating chat
     * @param {?=} close
     * @return {?}
     */
    toggleFloatingChatStart(close = false) {
        clearInterval(floatingToggleInterval);
        /** @type {?} */
        let steps = -100;
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
        () => {
            this.toggleFloatingChat(steps);
        }), 1);
    }
    /**
     * hide or display the floating chat by \@steps
     * @param {?} steps
     * @return {?}
     */
    toggleFloatingChat(steps) {
        /** @type {?} */
        const chatDiv = this.chatDivElement.nativeElement;
        /** @type {?} */
        let width = chatDiv.offsetWidth + steps;
        /** @type {?} */
        let height = chatDiv.offsetHeight + steps;
        /** @type {?} */
        let check = 0;
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
    }
    /**
     * attaches the open chat event to the given target
     * @return {?}
     */
    openChat() {
        /** @type {?} */
        const link = `${baseWebUrl}client/chat.php?${this.hash}`;
        /** @type {?} */
        let iframeInterval;
        /** @type {?} */
        const iframe = this.iframeElement;
        if (iframe) {
            iframe.nativeElement.focus();
        }
        else {
            /** @type {?} */
            const tempIframe = window.open(link);
            iframeInterval = setInterval((/**
             * @return {?}
             */
            () => {
                if (tempIframe.closed) {
                    clearInterval(iframeInterval);
                }
            }), 100);
        }
    }
}
NgxRumbletalkComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-rumbletalk',
                template: "<div\r\n  class=\"rumbletalk-embed\"\r\n  [ngStyle]=\"{ height: height + 'px' }\"\r\n  *ngIf=\"embedType === EMBED_TYPES.EMBEDDED\"\r\n>\r\n  <iframe\r\n    #iframe\r\n    frameBorder=\"0\"\r\n    allow=\"microphone; camera\"\r\n    allowtransparency=\"true\"\r\n    [ngStyle]=\"{ width: width + 'px' }\"\r\n  ></iframe>\r\n</div>\r\n\r\n<div\r\n  class=\"rumbletalk-floating\"\r\n  [ngClass]=\"{ 'rumbletalk-floating-right': side === 0, 'rumbletalk-floating-left': side !== 0 }\"\r\n  (click)=\"mobile ? openChat() : toggleFloatingChatStart()\"\r\n  *ngIf=\"embedType === EMBED_TYPES.FLOATING\"\r\n>\r\n  <img\r\n    alt=\"Click to join the conversation\"\r\n    title=\"Click to join the conversation\"\r\n    [src]=\"image\"\r\n    [ngClass]=\"{ right: side === 0, left: side !== 0 }\"\r\n    (load)=\"handleImageLoad($event)\"\r\n  />\r\n\r\n  <div\r\n    class=\"counter-div\"\r\n    [ngStyle]=\"{ top: counterTop + 'px', left: counterLeft + 'px' }\"\r\n    *ngIf=\"showDetails\"\r\n  >\r\n    <img alt=\"loading\" [src]=\"cdn + 'images/toolbar/mini_wait.gif'\" *ngIf=\"!mobile\" />\r\n  </div>\r\n\r\n  <div\r\n    #chatDiv\r\n    class=\"chat-div\"\r\n    [ngClass]=\"{ 'chat-div-left': side !== 0, 'chat-div-right': side === 0 }\"\r\n    style=\"visibility: hidden\"\r\n    *ngIf=\"!mobile\"\r\n  >\r\n    <img\r\n      class=\"close-button\"\r\n      alt=\"close\"\r\n      [src]=\"cdn + 'images/c.png'\"\r\n      [ngStyle]=\"side === 0 ? { left: '-8px' } : { right: '-8px' }\"\r\n      (click)=\"toggleFloatingChatStart(true)\"\r\n    />\r\n\r\n    <iframe\r\n      #iframe\r\n      frameBorder=\"0\"\r\n      allow=\"microphone; camera\"\r\n      allowtransparency=\"true\"\r\n      [ngStyle]=\"{ width: width + 'px' }\"\r\n    ></iframe>\r\n  </div>\r\n</div>\r\n\r\n<div\r\n  class=\"rumbletalk-embed-image\"\r\n  (click)=\"openChat()\"\r\n  *ngIf=\"embedType === EMBED_TYPES.MOBILE_FULL\"\r\n>\r\n  <img\r\n    alt=\"Click here to join the chat\"\r\n    title=\"Click here to join the chat\"\r\n    role=\"link\"\r\n    [src]=\"cdn + 'images/mobile-redirect.png'\"\r\n  />\r\n\r\n  <h3 role=\"link\">Click here to join the chat</h3>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".rumbletalk-embed{overflow:hidden}iframe{height:100%;overflow:hidden;background-color:transparent}.rumbletalk-floating{position:fixed;bottom:5px;z-index:2147483647;cursor:pointer}.rumbletalk-floating-left{left:5px}.rumbletalk-floating-right{right:5px}.rumbletalk-floating>img{max-width:none;position:absolute;bottom:0}.rumbletalk-floating>img.left{left:0}.rumbletalk-floating>img.right{right:0}.counter-div{position:absolute;width:28px;text-align:center;font:bold 12px arial;color:#000;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.chat-div{position:absolute;bottom:75px;overflow:hidden;padding:0;height:0}.chat-div-left{left:0}.chat-div-right{right:0}.close-button{cursor:pointer;position:absolute;top:-9px}.rumbletalk-embed-image{text-align:center}.rumbletalk-embed-image img{cursor:pointer}"]
            }] }
];
/** @nocollapse */
NgxRumbletalkComponent.ctorParameters = () => [
    { type: NgxRumbletalkService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJ1bWJsZXRhbGsvIiwic291cmNlcyI6WyJsaWIvbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7TUFFMUQsUUFBUSxHQUFHLFVBQVU7O01BQ3JCLFVBQVUsR0FBRyw2QkFBNkI7O01BQzFDLGtCQUFrQixHQUFHLDBCQUEwQjs7SUFDakQsTUFBYzs7SUFDZCxlQUFvQjs7SUFDcEIsc0JBQTJCO0FBUS9CLE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUF5QmpDLFlBQW9CLE9BQTZCO1FBQTdCLFlBQU8sR0FBUCxPQUFPLENBQXNCOzs7O1FBdkJ4QyxnQkFBVyxHQUFHO1lBQ3JCLFFBQVEsRUFBRSxDQUFDO1lBQ1gsUUFBUSxFQUFFLENBQUM7WUFDWCxXQUFXLEVBQUUsQ0FBQztTQUNmLENBQUM7UUFDTyxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO0lBaUIwQixDQUFDOzs7O0lBRXJELFFBQVE7O2NBQ0EsRUFBRSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO1FBQzVDLElBQUksQ0FBQyxNQUFNO1lBQ1QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFMUYsb0RBQW9EO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUMs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QW9COzs7NEJBeUIxQixTQUFTLFNBQUMsUUFBUTs2QkFDbEIsU0FBUyxTQUFDLFNBQVM7bUJBQ25CLEtBQUs7bUJBQ0wsS0FBSzt3QkFDTCxLQUFLO2tCQUNMLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsS0FBSztvQkFDTCxLQUFLOzBCQUNMLEtBQUs7Ozs7Ozs7SUFuQk4sNkNBSUU7O0lBQ0YsNENBQXlCOztJQUN6Qiw2Q0FBMEI7O0lBRTFCLCtDQUErQzs7SUFDL0MsZ0RBQWlEOztJQUNqRCxzQ0FBNkI7O0lBQzdCLHNDQUE2Qjs7SUFDN0IsMkNBQWtDOztJQUNsQyxxQ0FBNEI7O0lBQzVCLDBDQUFrQzs7SUFDbEMsdUNBQThCOztJQUM5Qix3Q0FBK0I7O0lBQy9CLHdDQUErQjs7SUFDL0IsdUNBQThCOztJQUM5Qiw2Q0FBcUM7O0lBRXJDLHdDQUFnQjs7Ozs7SUFFSix5Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFJ1bWJsZXRhbGtTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtcnVtYmxldGFsay5zZXJ2aWNlJztcblxuY29uc3QgcHJvdG9jb2wgPSAnaHR0cHM6Ly8nO1xuY29uc3QgYmFzZVdlYlVybCA9ICdodHRwczovL3d3dy5ydW1ibGV0YWxrLmNvbS8nO1xuY29uc3Qgc2VydmljZVJlbGF0aXZlVXJsID0gJ2NsaWVudC9zZXJ2aWNlLnBocD9oYXNoPSc7XG5sZXQgc2VydmVyOiBzdHJpbmc7XG5sZXQgbWVzc2FnZUludGVydmFsOiBhbnk7XG5sZXQgZmxvYXRpbmdUb2dnbGVJbnRlcnZhbDogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtcnVtYmxldGFsaycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtcnVtYmxldGFsay5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1ydW1ibGV0YWxrLmNvbXBvbmVudC5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTmd4UnVtYmxldGFsa0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgLyoqIEBjb25zdCBPYmplY3QgZGlmZmVyZW50IGVtYmVkZGluZyB0eXBlcyAqL1xuICByZWFkb25seSBFTUJFRF9UWVBFUyA9IHtcbiAgICBFTUJFRERFRDogMCxcbiAgICBGTE9BVElORzogMSxcbiAgICBNT0JJTEVfRlVMTDogMlxuICB9O1xuICByZWFkb25seSBjb3VudGVyVG9wID0gMTQ7XG4gIHJlYWRvbmx5IGNvdW50ZXJMZWZ0ID0gMjM7XG5cbiAgQFZpZXdDaGlsZCgnaWZyYW1lJykgaWZyYW1lRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnY2hhdERpdicpIGNoYXREaXZFbGVtZW50OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBwdWJsaWMgaGFzaDogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgc2lkZTogbnVtYmVyO1xuICBASW5wdXQoKSBwdWJsaWMgZW1iZWRUeXBlOiBudW1iZXI7XG4gIEBJbnB1dCgpIHB1YmxpYyBjZG46IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGZsb2F0aW5nOiBib29sZWFuO1xuICBASW5wdXQoKSBwdWJsaWMgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIGhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKSBwdWJsaWMgYm91bmNlOiBudW1iZXI7XG4gIEBJbnB1dCgpIHB1YmxpYyBpbWFnZTogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgc2hvd0RldGFpbHM6IGJvb2xlYW47XG5cbiAgbW9iaWxlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogTmd4UnVtYmxldGFsa1NlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvVXBwZXJDYXNlKCk7XG4gICAgdGhpcy5tb2JpbGUgPVxuICAgICAgdWEuaW5kZXhPZignTU9CSUxFJykgIT09IC0xIHx8IHVhLmluZGV4T2YoJ0FORFJPSUQnKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignSU9TJykgIT09IC0xO1xuXG4gICAgLyogaWYgd2ViIGFuZCBlbWJlZCB0eXBlIDIsIHRyZWF0IGFzIGVtYmVkZGVkICgwKSAqL1xuICAgIGlmICghdGhpcy5tb2JpbGUgJiYgdGhpcy5lbWJlZFR5cGUgPT09IHRoaXMuRU1CRURfVFlQRVMuTU9CSUxFX0ZVTEwpIHtcbiAgICAgIHRoaXMuZW1iZWRUeXBlID0gdGhpcy5FTUJFRF9UWVBFUy5FTUJFRERFRDtcbiAgICB9XG5cbiAgICB0aGlzLnNlcnZpY2UuYWRkcmVzcyh0aGlzLmhhc2gpLnN1YnNjcmliZShhZGRyZXNzID0+IHtcbiAgICAgIHNlcnZlciA9IGFkZHJlc3M7XG5cbiAgICAgIGlmICghdGhpcy5tb2JpbGUpIHtcbiAgICAgICAgdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3JjID0gYGh0dHBzOi8vJHthZGRyZXNzfS8ke3RoaXMuaGFzaH0vYDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuaW5zdGFudGlhdGVRdWVyeSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY2xlYXJJbnRlcnZhbChtZXNzYWdlSW50ZXJ2YWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgZXZlbnQgbGlzdGVuZXJzIGJhc2VkIG9uIHRoZSBlbWJlZCB0eXBlIGFuZCBkZXZpY2VcbiAgICovXG4gIGFkZExpc3RlbmVycygpOiB2b2lkIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuaW5mby5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlcyBwb3N0TWVzc2FnZSByZXF1ZXN0c1xuICAgKiBAcGFyYW0gZXZlbnQgLSB0aGUgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBpbmZvKGV2ZW50KSB7XG4gICAgaWYgKGlzRmluaXRlKGV2ZW50LmRhdGEpKSB7XG4gICAgICBjbGVhckludGVydmFsKG1lc3NhZ2VJbnRlcnZhbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXZlbnQuZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChldmVudC5kYXRhLnJlbG9hZCkge1xuICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZWxvYWRzIHRoZSBpZnJhbWUgKG9yIHBhcmVudCBwYWdlKSBpbiBjYXNlIG9mIGEgc2VydmVyIHJlcXVlc3RcbiAgICovXG4gIHJlbG9hZCgpIHtcbiAgICBjb25zdCB1cmwgPSBgJHtiYXNlV2ViVXJsfSR7c2VydmljZVJlbGF0aXZlVXJsfSR7dGhpcy5oYXNofWA7XG5cbiAgICB0aGlzLnNlcnZpY2UucmVsb2FkKHVybCkuc3Vic2NyaWJlKFxuICAgICAgcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXMpIHtcbiAgICAgICAgICBzZXJ2ZXIgPSByZXMuYWRkcmVzcztcbiAgICAgICAgICBjb25zdCBhZGRyZXNzID0gYCR7cHJvdG9jb2x9JHtzZXJ2ZXJ9LyR7dGhpcy5oYXNofS9gO1xuXG4gICAgICAgICAgaWYgKHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9IGFkZHJlc3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50LmxvY2F0aW9uLmhyZWYgPSBhZGRyZXNzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuaW5zdGFudGlhdGVRdWVyeSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaWdub3JlID0+IGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGFydHMgW3JlcGVhdGVkbHldIHRyeWluZyB0byBjb25uZWN0IHRvIHRoZSBjaGF0IHVzaW5nIHBvc3RNZXNzYWdlXG4gICAqL1xuICBpbnN0YW50aWF0ZVF1ZXJ5KCkge1xuICAgIG1lc3NhZ2VJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucXVlcnkuYmluZCh0aGlzKSwgMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogaW5zdGFudGlhdGUgYSBwb3N0TWVzc2FnZSBjb25uZWN0aW9uIHdpdGggdGhlIGNoYXRcbiAgICovXG4gIHF1ZXJ5KCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdGFyZ2V0O1xuICAgICAgbGV0IG9yaWdpbjtcblxuICAgICAgaWYgKHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGVudFdpbmRvdztcbiAgICAgICAgb3JpZ2luID0gcHJvdG9jb2wgKyBzZXJ2ZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgb3JpZ2luID0gYmFzZVdlYlVybDtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0LnBvc3RNZXNzYWdlKCd0b29sYmFyJywgb3JpZ2luKTtcbiAgICB9IGNhdGNoIChpZ25vcmUpIHt9XG4gIH1cblxuICAvKipcbiAgICogY2hlY2tzIGlmIHRoZSBnaXZlbiBvcmlnaW4gaXMgb2YgYSBjaGF0IHNlcnZpY2VcbiAgICogQHBhcmFtIG9yaWdpbiAtIHRoZSBVUkwgb2YgdGhlIG9yaWdpblxuICAgKiByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIHZhbGlkYXRlT3JpZ2luKG9yaWdpbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXmh0dHBzOlxcL1xcLy4rXFwucnVtYmxldGFsa1xcLihuZXR8Y29tKSg6NDQzMyk/JC8udGVzdChvcmlnaW4pO1xuICB9XG5cbiAgaGFuZGxlSW1hZ2VMb2FkKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAvKiBpbWFnZSBlbGVtZW50ICovXG4gICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgIC8qIHBhcmVudCBkaXYgKi9cbiAgICBjb25zdCBwYXJlbnQgPSBldmVudC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGU7XG5cbiAgICAvKiBtYXRjaCB0aGUgZGltZW5zaW9ucyBvZiB0aGUgaW1hZ2UgYW5kIHRoZSB3cmFwcGluZyBkaXYgKi9cbiAgICBwYXJlbnQuc3R5bGUuaGVpZ2h0ID0gYCR7dGFyZ2V0LmhlaWdodH1weGA7XG4gICAgcGFyZW50LnN0eWxlLndpZHRoID0gYCR7dGFyZ2V0LndpZHRofXB4YDtcblxuICAgIC8qIHBsYWNlIHRoZSBjaGF0IGRpdiByaWdodCBhYm92ZSB0aGUgaW1hZ2UgKi9cbiAgICBpZiAoIXRoaXMubW9iaWxlKSB7XG4gICAgICB0aGlzLmNoYXREaXZFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUuYm90dG9tID0gYCR7dGFyZ2V0LmhlaWdodH1weGA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGhpZGVzIG9yIHNob3dzIHRoZSBmbG9hdGluZyBjaGF0XG4gICAqIEBwYXJhbSBib29sZWFuIFtjbG9zZV0gLSBpZiBzZXQgdG8gdHJ1ZSwgd2lsbCBmb3JjZSBoaWRlXG4gICAqL1xuICB0b2dnbGVGbG9hdGluZ0NoYXRTdGFydChjbG9zZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgY2xlYXJJbnRlcnZhbChmbG9hdGluZ1RvZ2dsZUludGVydmFsKTtcbiAgICBsZXQgc3RlcHMgPSAtMTAwO1xuXG4gICAgaWYgKHRoaXMuY2hhdERpdkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID09PSAnaGlkZGVuJyAmJiAhY2xvc2UpIHtcbiAgICAgIHN0ZXBzICo9IC0xO1xuICAgICAgdGhpcy5jaGF0RGl2RWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLndpZHRoID0gMDtcbiAgICAgIHRoaXMuY2hhdERpdkVsZW1lbnQubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSAwO1xuICAgICAgdGhpcy5jaGF0RGl2RWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ3Zpc2libGUnO1xuICAgICAgdGhpcy5jaGF0RGl2RWxlbWVudC5uYXRpdmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgfVxuXG4gICAgZmxvYXRpbmdUb2dnbGVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMudG9nZ2xlRmxvYXRpbmdDaGF0KHN0ZXBzKTtcbiAgICB9LCAxKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoaWRlIG9yIGRpc3BsYXkgdGhlIGZsb2F0aW5nIGNoYXQgYnkgQHN0ZXBzXG4gICAqIEBwYXJhbSBudW1iZXIgc3RlcHMgLSB0aGUgbnVtYmVyIG9mIHBpeGVscyB0byBpbmNyZW1lbnQgdGhlIGRpc3BsYXkgYnlcbiAgICovXG4gIHRvZ2dsZUZsb2F0aW5nQ2hhdChzdGVwcyk6IHZvaWQge1xuICAgIGNvbnN0IGNoYXREaXYgPSB0aGlzLmNoYXREaXZFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IHdpZHRoID0gY2hhdERpdi5vZmZzZXRXaWR0aCArIHN0ZXBzO1xuICAgIGxldCBoZWlnaHQgPSBjaGF0RGl2Lm9mZnNldEhlaWdodCArIHN0ZXBzO1xuICAgIGxldCBjaGVjayA9IDA7XG5cbiAgICBpZiAod2lkdGggPCAwKSB7XG4gICAgICB3aWR0aCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKGhlaWdodCA8IDApIHtcbiAgICAgIGhlaWdodCA9IDA7XG4gICAgfVxuXG4gICAgaWYgKHdpZHRoID49IDAgJiYgaGVpZ2h0ID49IDApIHtcbiAgICAgIGlmICh3aWR0aCA8PSB0aGlzLndpZHRoKSB7XG4gICAgICAgIGNoZWNrID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgIH1cblxuICAgICAgaWYgKGhlaWdodCA8PSB0aGlzLmhlaWdodCkge1xuICAgICAgICBjaGVjayA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgIH1cblxuICAgICAgY2hhdERpdi5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgIGNoYXREaXYuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICB9XG5cbiAgICBpZiAoIWNoZWNrIHx8IHdpZHRoIDw9IDAgfHwgaGVpZ2h0IDw9IDApIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoZmxvYXRpbmdUb2dnbGVJbnRlcnZhbCk7XG4gICAgICBpZiAod2lkdGggPCB0aGlzLndpZHRoKSB7XG4gICAgICAgIGNoYXREaXYuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICBjaGF0RGl2LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGF0dGFjaGVzIHRoZSBvcGVuIGNoYXQgZXZlbnQgdG8gdGhlIGdpdmVuIHRhcmdldFxuICAgKiBAcGFyYW0gRWxlbWVudCB0YXJnZXRcbiAgICovXG4gIG9wZW5DaGF0KCk6IHZvaWQge1xuICAgIGNvbnN0IGxpbmsgPSBgJHtiYXNlV2ViVXJsfWNsaWVudC9jaGF0LnBocD8ke3RoaXMuaGFzaH1gO1xuICAgIGxldCBpZnJhbWVJbnRlcnZhbDtcbiAgICBjb25zdCBpZnJhbWUgPSB0aGlzLmlmcmFtZUVsZW1lbnQ7XG5cbiAgICBpZiAoaWZyYW1lKSB7XG4gICAgICBpZnJhbWUubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0ZW1wSWZyYW1lID0gd2luZG93Lm9wZW4obGluayk7XG4gICAgICBpZnJhbWVJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHRlbXBJZnJhbWUuY2xvc2VkKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChpZnJhbWVJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEwMCk7XG4gICAgfVxuICB9XG59XG4iXX0=