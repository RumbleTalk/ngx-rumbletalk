/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
        var xhr = new XMLHttpRequest();
        xhr.open('GET', baseWebUrl + serviceRelativeUrl + this.hash, true);
        xhr.onreadystatechange = (/**
         * @return {?}
         */
        function () {
            if (xhr.readyState !== 4) {
                return;
            }
            try {
                /** @type {?} */
                var response = JSON.parse(xhr.responseText);
                if (response.status) {
                    /** @type {?} */
                    var tempServer = response.address;
                    /** @type {?} */
                    var address = protocol + tempServer + '/' + _this.hash + '/';
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
                    template: "<iframe\r\n  #iframe\r\n  allowtransparency=\"true\"\r\n  allow=\"microphone; camera\"\r\n  [src]=\"safeSrc\"\r\n  [width]=\"width\"\r\n  [height]=\"height\"\r\n></iframe>\r\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["iframe{border:0;width:100%;height:100%;background-color:transparent;overflow:hidden}"]
                }] }
    ];
    /** @nocollapse */
    NgxRumbletalkComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    NgxRumbletalkComponent.propDecorators = {
        iframeElement: [{ type: ViewChild, args: ['iframe',] }],
        src: [{ type: Input }],
        floating: [{ type: Input }],
        width: [{ type: Input }],
        height: [{ type: Input }],
        hash: [{ type: Input }]
    };
    return NgxRumbletalkComponent;
}());
export { NgxRumbletalkComponent };
if (false) {
    /** @type {?} */
    NgxRumbletalkComponent.prototype.iframeElement;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.src;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.floating;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.width;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.height;
    /** @type {?} */
    NgxRumbletalkComponent.prototype.hash;
    /**
     * @type {?}
     * @private
     */
    NgxRumbletalkComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJ1bWJsZXRhbGsvIiwic291cmNlcyI6WyJsaWIvbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBRW5ELFFBQVEsR0FBRyxVQUFVOztJQUNyQixVQUFVLEdBQUcsNkJBQTZCOztJQUMxQyxrQkFBa0IsR0FBRywwQkFBMEI7O0lBQy9DLE1BQU0sR0FBRywrQkFBK0I7O0lBQzFDLGVBQW9CO0FBRXhCO0lBY0UsZ0NBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDO0lBRS9DLHNCQUFJLDJDQUFPOzs7O1FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7OztPQUFBOzs7O0lBRUQseUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2Q0FBWTs7OztJQUFaO1FBQ0UsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCxxQ0FBSTs7Ozs7SUFBSixVQUFLLEtBQUs7UUFDUixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEIs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QUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLOztJQXlHUiw2QkFBQztDQUFBLEFBckhELElBcUhDO1NBL0dZLHNCQUFzQjs7O0lBQ2pDLCtDQUErQzs7SUFDL0MscUNBQTRCOztJQUM1QiwwQ0FBa0M7O0lBQ2xDLHVDQUE4Qjs7SUFDOUIsd0NBQStCOztJQUMvQixzQ0FBNkI7Ozs7O0lBRWpCLDJDQUErQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5jb25zdCBwcm90b2NvbCA9ICdodHRwczovLyc7XG5jb25zdCBiYXNlV2ViVXJsID0gJ2h0dHBzOi8vd3d3LnJ1bWJsZXRhbGsuY29tLyc7XG5jb25zdCBzZXJ2aWNlUmVsYXRpdmVVcmwgPSAnY2xpZW50L3NlcnZpY2UucGhwP2hhc2g9JztcbmNvbnN0IHNlcnZlciA9ICdzdGFnZ2luZzUucnVtYmxldGFsay5uZXQ6NDQzMyc7XG52YXIgbWVzc2FnZUludGVydmFsOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1ydW1ibGV0YWxrJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1ydW1ibGV0YWxrLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hSdW1ibGV0YWxrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnaWZyYW1lJykgaWZyYW1lRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgcHVibGljIHNyYzogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZmxvYXRpbmc6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoYXNoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBnZXQgc2FmZVNyYygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodGhpcy5zcmMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmluc3RhbnRpYXRlUXVlcnkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIGV2ZW50IGxpc3RlbmVycyBiYXNlZCBvbiB0aGUgZW1iZWQgdHlwZSBhbmQgZGV2aWNlXG4gICAqL1xuICBhZGRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmluZm8uYmluZCh0aGlzKSwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXMgcG9zdE1lc3NhZ2UgcmVxdWVzdHNcbiAgICogQHBhcmFtIGV2ZW50IC0gdGhlIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgaW5mbyhldmVudCkge1xuICAgIGlmIChpc0Zpbml0ZShldmVudC5kYXRhKSkge1xuICAgICAgY2xlYXJJbnRlcnZhbChtZXNzYWdlSW50ZXJ2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV2ZW50LmRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoZXZlbnQuZGF0YS5yZWxvYWQpIHtcbiAgICAgICAgdGhpcy5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVsb2FkcyB0aGUgaWZyYW1lIChvciBwYXJlbnQgcGFnZSkgaW4gY2FzZSBvZiBhIHNlcnZlciByZXF1ZXN0XG4gICAqL1xuICByZWxvYWQoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICB4aHIub3BlbignR0VUJywgYmFzZVdlYlVybCArIHNlcnZpY2VSZWxhdGl2ZVVybCArIHRoaXMuaGFzaCwgdHJ1ZSk7XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICBjb25zdCB0ZW1wU2VydmVyID0gcmVzcG9uc2UuYWRkcmVzcztcbiAgICAgICAgICBjb25zdCBhZGRyZXNzID0gcHJvdG9jb2wgKyB0ZW1wU2VydmVyICsgJy8nICsgdGhpcy5oYXNoICsgJy8nO1xuXG4gICAgICAgICAgaWYgKHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9IGFkZHJlc3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50LmxvY2F0aW9uLmhyZWYgPSBhZGRyZXNzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuaW5zdGFudGlhdGVRdWVyeSgpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB4aHIuc2VuZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0cyBbcmVwZWF0ZWRseV0gdHJ5aW5nIHRvIGNvbm5lY3QgdG8gdGhlIGNoYXQgdXNpbmcgcG9zdE1lc3NhZ2VcbiAgICovXG4gIGluc3RhbnRpYXRlUXVlcnkoKSB7XG4gICAgbWVzc2FnZUludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5xdWVyeS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbnN0YW50aWF0ZSBhIHBvc3RNZXNzYWdlIGNvbm5lY3Rpb24gd2l0aCB0aGUgY2hhdFxuICAgKi9cbiAgcXVlcnkoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB0YXJnZXQ7XG4gICAgICBsZXQgb3JpZ2luO1xuXG4gICAgICBpZiAodGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0YXJnZXQgPSB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudC5jb250ZW50V2luZG93O1xuICAgICAgICBvcmlnaW4gPSBwcm90b2NvbCArIHNlcnZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBvcmlnaW4gPSBiYXNlV2ViVXJsO1xuICAgICAgfVxuXG4gICAgICB0YXJnZXQucG9zdE1lc3NhZ2UoJ3Rvb2xiYXInLCBvcmlnaW4pO1xuICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVja3MgaWYgdGhlIGdpdmVuIG9yaWdpbiBpcyBvZiBhIGNoYXQgc2VydmljZVxuICAgKiBAcGFyYW0gb3JpZ2luIC0gdGhlIFVSTCBvZiB0aGUgb3JpZ2luXG4gICAqIHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgdmFsaWRhdGVPcmlnaW4ob3JpZ2luKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eaHR0cHM6XFwvXFwvLitcXC5ydW1ibGV0YWxrXFwuKG5ldHxjb20pKDo0NDMzKT8kLy50ZXN0KG9yaWdpbik7XG4gIH1cbn1cbiJdfQ==