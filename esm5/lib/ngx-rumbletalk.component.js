/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgxRumbletalkService } from './ngx-rumbletalk.service';
import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
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
export { NgxRumbletalkComponent };
if (false) {
    /** @type {?} */
    NgxRumbletalkComponent.prototype.iframeElement;
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
    NgxRumbletalkComponent.prototype.service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJ1bWJsZXRhbGsvIiwic291cmNlcyI6WyJsaWIvbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQzs7SUFFakIsUUFBUSxHQUFHLFVBQVU7O0lBQ3JCLFVBQVUsR0FBRyw2QkFBNkI7O0lBQzFDLGtCQUFrQixHQUFHLDBCQUEwQjs7SUFDakQsTUFBTTs7SUFDTixlQUFvQjtBQUV4QjtJQWFFLGdDQUFvQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtJQUFHLENBQUM7Ozs7SUFFckQseUNBQVE7OztJQUFSO1FBQUEsaUJBT0M7UUFOQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsT0FBTztZQUMvQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxhQUFXLE9BQU8sU0FBSSxLQUFJLENBQUMsSUFBSSxNQUFHLENBQUM7WUFDMUUsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELDRDQUFXOzs7SUFBWDtRQUNFLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsNkNBQVk7Ozs7SUFBWjtRQUNFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUs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O0lBa0dSLDZCQUFDO0NBQUEsQUE3R0QsSUE2R0M7U0F2R1ksc0JBQXNCOzs7SUFDakMsK0NBQStDOztJQUMvQywwQ0FBa0M7O0lBQ2xDLHVDQUE4Qjs7SUFDOUIsd0NBQStCOztJQUMvQixzQ0FBNkI7Ozs7O0lBRWpCLHlDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5neFJ1bWJsZXRhbGtTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtcnVtYmxldGFsay5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBwcm90b2NvbCA9ICdodHRwczovLyc7XG5jb25zdCBiYXNlV2ViVXJsID0gJ2h0dHBzOi8vd3d3LnJ1bWJsZXRhbGsuY29tLyc7XG5jb25zdCBzZXJ2aWNlUmVsYXRpdmVVcmwgPSAnY2xpZW50L3NlcnZpY2UucGhwP2hhc2g9JztcbmxldCBzZXJ2ZXI7XG5sZXQgbWVzc2FnZUludGVydmFsOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1ydW1ibGV0YWxrJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1ydW1ibGV0YWxrLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hSdW1ibGV0YWxrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdpZnJhbWUnKSBpZnJhbWVFbGVtZW50OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBwdWJsaWMgZmxvYXRpbmc6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoYXNoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBOZ3hSdW1ibGV0YWxrU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnNlcnZpY2UuYWRkcmVzcyh0aGlzLmhhc2gpLnN1YnNjcmliZShhZGRyZXNzID0+IHtcbiAgICAgIHNlcnZlciA9IGFkZHJlc3M7XG4gICAgICB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudC5zcmMgPSBgaHR0cHM6Ly8ke2FkZHJlc3N9LyR7dGhpcy5oYXNofS9gO1xuICAgICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuaW5zdGFudGlhdGVRdWVyeSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY2xlYXJJbnRlcnZhbChtZXNzYWdlSW50ZXJ2YWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgZXZlbnQgbGlzdGVuZXJzIGJhc2VkIG9uIHRoZSBlbWJlZCB0eXBlIGFuZCBkZXZpY2VcbiAgICovXG4gIGFkZExpc3RlbmVycygpOiB2b2lkIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuaW5mby5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlcyBwb3N0TWVzc2FnZSByZXF1ZXN0c1xuICAgKiBAcGFyYW0gZXZlbnQgLSB0aGUgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBpbmZvKGV2ZW50KSB7XG4gICAgaWYgKGlzRmluaXRlKGV2ZW50LmRhdGEpKSB7XG4gICAgICBjbGVhckludGVydmFsKG1lc3NhZ2VJbnRlcnZhbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXZlbnQuZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChldmVudC5kYXRhLnJlbG9hZCkge1xuICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZWxvYWRzIHRoZSBpZnJhbWUgKG9yIHBhcmVudCBwYWdlKSBpbiBjYXNlIG9mIGEgc2VydmVyIHJlcXVlc3RcbiAgICovXG4gIHJlbG9hZCgpIHtcbiAgICBjb25zdCB1cmwgPSBgJHtiYXNlV2ViVXJsfSR7c2VydmljZVJlbGF0aXZlVXJsfSR7dGhpcy5oYXNofWA7XG5cbiAgICB0aGlzLnNlcnZpY2UucmVsb2FkKHVybCkuc3Vic2NyaWJlKFxuICAgICAgcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXMpIHtcbiAgICAgICAgICBzZXJ2ZXIgPSByZXMuYWRkcmVzcztcbiAgICAgICAgICBjb25zdCBhZGRyZXNzID0gYCR7cHJvdG9jb2x9JHtzZXJ2ZXJ9LyR7dGhpcy5oYXNofS9gO1xuXG4gICAgICAgICAgaWYgKHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9IGFkZHJlc3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50LmxvY2F0aW9uLmhyZWYgPSBhZGRyZXNzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuaW5zdGFudGlhdGVRdWVyeSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaWdub3JlID0+IGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGFydHMgW3JlcGVhdGVkbHldIHRyeWluZyB0byBjb25uZWN0IHRvIHRoZSBjaGF0IHVzaW5nIHBvc3RNZXNzYWdlXG4gICAqL1xuICBpbnN0YW50aWF0ZVF1ZXJ5KCkge1xuICAgIG1lc3NhZ2VJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucXVlcnkuYmluZCh0aGlzKSwgMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogaW5zdGFudGlhdGUgYSBwb3N0TWVzc2FnZSBjb25uZWN0aW9uIHdpdGggdGhlIGNoYXRcbiAgICovXG4gIHF1ZXJ5KCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdGFyZ2V0O1xuICAgICAgbGV0IG9yaWdpbjtcblxuICAgICAgaWYgKHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGVudFdpbmRvdztcbiAgICAgICAgb3JpZ2luID0gcHJvdG9jb2wgKyBzZXJ2ZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgb3JpZ2luID0gYmFzZVdlYlVybDtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0LnBvc3RNZXNzYWdlKCd0b29sYmFyJywgb3JpZ2luKTtcbiAgICB9IGNhdGNoIChpZ25vcmUpIHt9XG4gIH1cblxuICAvKipcbiAgICogY2hlY2tzIGlmIHRoZSBnaXZlbiBvcmlnaW4gaXMgb2YgYSBjaGF0IHNlcnZpY2VcbiAgICogQHBhcmFtIG9yaWdpbiAtIHRoZSBVUkwgb2YgdGhlIG9yaWdpblxuICAgKiByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIHZhbGlkYXRlT3JpZ2luKG9yaWdpbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXmh0dHBzOlxcL1xcLy4rXFwucnVtYmxldGFsa1xcLihuZXR8Y29tKSg6NDQzMyk/JC8udGVzdChvcmlnaW4pO1xuICB9XG59XG4iXX0=