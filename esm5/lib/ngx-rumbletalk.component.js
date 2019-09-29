/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgxRumbletalkService } from './ngx-rumbletalk.service';
import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
/** @type {?} */
var protocol = 'https://';
/** @type {?} */
var baseWebUrl = 'https://www.rumbletalk.com/';
/** @type {?} */
var serviceRelativeUrl = 'client/service.php?hash=';
// const server = 'stagging5.rumbletalk.net:4433';
/** @type {?} */
var server;
/** @type {?} */
var messageInterval;
var NgxRumbletalkComponent = /** @class */ (function () {
    // constructor(private sanitizer: DomSanitizer) {}
    function NgxRumbletalkComponent(service) {
        this.service = service;
    }
    // get safeSrc(): any {
    //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    // }
    // get safeSrc(): any {
    //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    // }
    /**
     * @return {?}
     */
    NgxRumbletalkComponent.prototype.ngOnInit = 
    // get safeSrc(): any {
    //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    // }
    /**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJ1bWJsZXRhbGsvIiwic291cmNlcyI6WyJsaWIvbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQzs7O0lBR2pCLFFBQVEsR0FBRyxVQUFVOztJQUNyQixVQUFVLEdBQUcsNkJBQTZCOztJQUMxQyxrQkFBa0IsR0FBRywwQkFBMEI7OztJQUVqRCxNQUFNOztJQUNOLGVBQW9CO0FBRXhCO0lBY0Usa0RBQWtEO0lBQ2xELGdDQUFvQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtJQUFHLENBQUM7SUFFckQsdUJBQXVCO0lBQ3ZCLG9FQUFvRTtJQUNwRSxJQUFJOzs7Ozs7O0lBRUoseUNBQVE7Ozs7Ozs7SUFBUjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLE9BQU87WUFDL0MsTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUNqQixLQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsYUFBVyxPQUFPLFNBQUksS0FBSSxDQUFDLElBQUksTUFBRyxDQUFDO1lBQzFFLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2Q0FBWTs7OztJQUFaO1FBQ0UsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJ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QUFDOztnQkF6SEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLG9LQUE4QztvQkFFOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2lCQUNoRDs7OztnQkF2QlEsb0JBQW9COzs7Z0NBeUIxQixTQUFTLFNBQUMsUUFBUTsyQkFFbEIsS0FBSzt3QkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBQ0wsS0FBSzs7SUE4R1IsNkJBQUM7Q0FBQSxBQTFIRCxJQTBIQztTQXBIWSxzQkFBc0I7OztJQUNqQywrQ0FBK0M7O0lBRS9DLDBDQUFrQzs7SUFDbEMsdUNBQThCOztJQUM5Qix3Q0FBK0I7O0lBQy9CLHNDQUE2Qjs7Ozs7SUFHakIseUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmd4UnVtYmxldGFsa1NlcnZpY2UgfSBmcm9tICcuL25neC1ydW1ibGV0YWxrLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy8gaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmNvbnN0IHByb3RvY29sID0gJ2h0dHBzOi8vJztcbmNvbnN0IGJhc2VXZWJVcmwgPSAnaHR0cHM6Ly93d3cucnVtYmxldGFsay5jb20vJztcbmNvbnN0IHNlcnZpY2VSZWxhdGl2ZVVybCA9ICdjbGllbnQvc2VydmljZS5waHA/aGFzaD0nO1xuLy8gY29uc3Qgc2VydmVyID0gJ3N0YWdnaW5nNS5ydW1ibGV0YWxrLm5ldDo0NDMzJztcbmxldCBzZXJ2ZXI7XG5sZXQgbWVzc2FnZUludGVydmFsOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1ydW1ibGV0YWxrJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1ydW1ibGV0YWxrLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hSdW1ibGV0YWxrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnaWZyYW1lJykgaWZyYW1lRWxlbWVudDogRWxlbWVudFJlZjtcbiAgLy8gQElucHV0KCkgcHVibGljIHNyYzogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZmxvYXRpbmc6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoYXNoOiBzdHJpbmc7XG5cbiAgLy8gY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBOZ3hSdW1ibGV0YWxrU2VydmljZSkge31cblxuICAvLyBnZXQgc2FmZVNyYygpOiBhbnkge1xuICAvLyAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodGhpcy5zcmMpO1xuICAvLyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zZXJ2aWNlLmFkZHJlc3ModGhpcy5oYXNoKS5zdWJzY3JpYmUoYWRkcmVzcyA9PiB7XG4gICAgICBzZXJ2ZXIgPSBhZGRyZXNzO1xuICAgICAgdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3JjID0gYGh0dHBzOi8vJHthZGRyZXNzfS8ke3RoaXMuaGFzaH0vYDtcbiAgICAgIHRoaXMuYWRkTGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLmluc3RhbnRpYXRlUXVlcnkoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIGV2ZW50IGxpc3RlbmVycyBiYXNlZCBvbiB0aGUgZW1iZWQgdHlwZSBhbmQgZGV2aWNlXG4gICAqL1xuICBhZGRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmluZm8uYmluZCh0aGlzKSwgZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGhhbmRsZXMgcG9zdE1lc3NhZ2UgcmVxdWVzdHNcbiAgICogQHBhcmFtIGV2ZW50IC0gdGhlIGV2ZW50IG9iamVjdFxuICAgKi9cbiAgaW5mbyhldmVudCkge1xuICAgIGlmIChpc0Zpbml0ZShldmVudC5kYXRhKSkge1xuICAgICAgY2xlYXJJbnRlcnZhbChtZXNzYWdlSW50ZXJ2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV2ZW50LmRhdGEgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoZXZlbnQuZGF0YS5yZWxvYWQpIHtcbiAgICAgICAgdGhpcy5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogcmVsb2FkcyB0aGUgaWZyYW1lIChvciBwYXJlbnQgcGFnZSkgaW4gY2FzZSBvZiBhIHNlcnZlciByZXF1ZXN0XG4gICAqL1xuICByZWxvYWQoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICB4aHIub3BlbignR0VUJywgYmFzZVdlYlVybCArIHNlcnZpY2VSZWxhdGl2ZVVybCArIHRoaXMuaGFzaCwgdHJ1ZSk7XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICBzZXJ2ZXIgPSByZXNwb25zZS5hZGRyZXNzO1xuICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSBwcm90b2NvbCArIHNlcnZlciArICcvJyArIHRoaXMuaGFzaCArICcvJztcblxuICAgICAgICAgIGlmICh0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudC5zcmMgPSBhZGRyZXNzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudC5sb2NhdGlvbi5ocmVmID0gYWRkcmVzcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmluc3RhbnRpYXRlUXVlcnkoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyLnNlbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGFydHMgW3JlcGVhdGVkbHldIHRyeWluZyB0byBjb25uZWN0IHRvIHRoZSBjaGF0IHVzaW5nIHBvc3RNZXNzYWdlXG4gICAqL1xuICBpbnN0YW50aWF0ZVF1ZXJ5KCkge1xuICAgIG1lc3NhZ2VJbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMucXVlcnkuYmluZCh0aGlzKSwgMTAwMCk7XG4gIH1cblxuICAvKipcbiAgICogaW5zdGFudGlhdGUgYSBwb3N0TWVzc2FnZSBjb25uZWN0aW9uIHdpdGggdGhlIGNoYXRcbiAgICovXG4gIHF1ZXJ5KCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdGFyZ2V0O1xuICAgICAgbGV0IG9yaWdpbjtcblxuICAgICAgaWYgKHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGVudFdpbmRvdztcbiAgICAgICAgb3JpZ2luID0gcHJvdG9jb2wgKyBzZXJ2ZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXQgPSB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgICAgb3JpZ2luID0gYmFzZVdlYlVybDtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0LnBvc3RNZXNzYWdlKCd0b29sYmFyJywgb3JpZ2luKTtcbiAgICB9IGNhdGNoIChpZ25vcmUpIHt9XG4gIH1cblxuICAvKipcbiAgICogY2hlY2tzIGlmIHRoZSBnaXZlbiBvcmlnaW4gaXMgb2YgYSBjaGF0IHNlcnZpY2VcbiAgICogQHBhcmFtIG9yaWdpbiAtIHRoZSBVUkwgb2YgdGhlIG9yaWdpblxuICAgKiByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIHZhbGlkYXRlT3JpZ2luKG9yaWdpbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAvXmh0dHBzOlxcL1xcLy4rXFwucnVtYmxldGFsa1xcLihuZXR8Y29tKSg6NDQzMyk/JC8udGVzdChvcmlnaW4pO1xuICB9XG59XG4iXX0=