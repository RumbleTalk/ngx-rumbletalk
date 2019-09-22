/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/** @type {?} */
const protocol = 'https://';
/** @type {?} */
const baseWebUrl = 'https://www.rumbletalk.com/';
/** @type {?} */
const serviceRelativeUrl = 'client/service.php?hash=';
/** @type {?} */
let server = 'stagging5.rumbletalk.net:4433';
/** @type {?} */
let messageInterval;
export class NgxRumbletalkComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        /**
         * handles postMessage requests
         * @param event - the event object
         */
        this.info = (/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (isFinite(event.data)) {
                clearInterval(messageInterval);
            }
            else if (typeof event.data === 'object') {
                if (event.data.reload) {
                    this.reload();
                }
            }
        });
    }
    /**
     * @return {?}
     */
    get safeSrc() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.addListeners();
        this.instantiateQuery();
    }
    /**
     * add the event listeners based on the embed type and device
     * @return {?}
     */
    addListeners() {
        window.addEventListener('message', this.info, false);
    }
    /**
     * reloads the iframe (or parent page) in case of a server request
     * @return {?}
     */
    reload() {
        /** @type {?} */
        const xhr = new XMLHttpRequest();
        xhr.open('GET', baseWebUrl + serviceRelativeUrl + this.hash, true);
        xhr.onreadystatechange = (/**
         * @return {?}
         */
        () => {
            if (xhr.readyState !== 4) {
                return;
            }
            try {
                /** @type {?} */
                const response = JSON.parse(xhr.responseText);
                if (response.status) {
                    server = response.address;
                    /** @type {?} */
                    const address = protocol + server + '/' + this.hash + '/';
                    if (this.iframeElement.nativeElement instanceof HTMLIFrameElement) {
                        this.iframeElement.nativeElement.src = address;
                    }
                    else {
                        this.iframeElement.nativeElement.location.href = address;
                    }
                    this.instantiateQuery();
                }
            }
            catch (e) {
                location.reload();
            }
        });
        xhr.send();
    }
    /**
     * starts [repeatedly] trying to connect to the chat using postMessage
     * @return {?}
     */
    instantiateQuery() {
        messageInterval = setInterval((/**
         * @return {?}
         */
        () => {
            this.query();
        }), 1000);
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
                template: "<iframe\r\n  #iframe\r\n  allowtransparency=\"true\"\r\n  allow=\"microphone; camera\"\r\n  [src]=\"safeSrc\"\r\n  [width]=\"width\"\r\n  [height]=\"height\"\r\n></iframe>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["iframe{border:0;width:100%;height:100%;background-color:transparent;overflow:hidden}"]
            }] }
];
/** @nocollapse */
NgxRumbletalkComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
NgxRumbletalkComponent.propDecorators = {
    iframeElement: [{ type: ViewChild, args: ['iframe',] }],
    src: [{ type: Input }],
    floating: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    hash: [{ type: Input }]
};
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
     * handles postMessage requests
     * \@param event - the event object
     * @type {?}
     */
    NgxRumbletalkComponent.prototype.info;
    /**
     * @type {?}
     * @private
     */
    NgxRumbletalkComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJ1bWJsZXRhbGsvIiwic291cmNlcyI6WyJsaWIvbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O01BRW5ELFFBQVEsR0FBRyxVQUFVOztNQUNyQixVQUFVLEdBQUcsNkJBQTZCOztNQUMxQyxrQkFBa0IsR0FBRywwQkFBMEI7O0lBQ2pELE1BQU0sR0FBRywrQkFBK0I7O0lBQ3hDLGVBQW9CO0FBUXhCLE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFRakMsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYzs7Ozs7UUFzQjNDLFNBQUk7Ozs7UUFBRyxLQUFLLENBQUMsRUFBRTtZQUNiLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEIsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDekMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNmO2FBQ0Y7UUFDSCxDQUFDLEVBQUM7SUE5QjRDLENBQUM7Ozs7SUFFL0MsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUtELFlBQVk7UUFDVixNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFtQkQsTUFBTTs7Y0FDRSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUU7UUFFaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBVSxHQUFHLGtCQUFrQixHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbkUsR0FBRyxDQUFDLGtCQUFrQjs7O1FBQUcsR0FBRyxFQUFFO1lBQzVCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU87YUFDUjtZQUVELElBQUk7O3NCQUNJLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUM7Z0JBRTdDLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDbkIsTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7OzBCQUNwQixPQUFPLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHO29CQUV6RCxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxZQUFZLGlCQUFpQixFQUFFO3dCQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDO3FCQUNoRDt5QkFBTTt3QkFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztxQkFDMUQ7b0JBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7aUJBQ3pCO2FBQ0Y7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDbkI7UUFDSCxDQUFDLENBQUEsQ0FBQztRQUVGLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7Ozs7O0lBS0QsZ0JBQWdCO1FBQ2QsZUFBZSxHQUFHLFdBQVc7OztRQUFDLEdBQUcsRUFBRTtZQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZixDQUFDLEdBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDOzs7OztJQUtELEtBQUs7UUFDSCxJQUFJOztnQkFDRSxNQUFNOztnQkFDTixNQUFNO1lBRVYsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsWUFBWSxpQkFBaUIsRUFBRTtnQkFDakUsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztnQkFDeEQsTUFBTSxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO2dCQUMxQyxNQUFNLEdBQUcsVUFBVSxDQUFDO2FBQ3JCO1lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdkM7UUFBQyxPQUFPLE1BQU0sRUFBRSxHQUFFO0lBQ3JCLENBQUM7Ozs7Ozs7SUFPRCxjQUFjLENBQUMsTUFBTTtRQUNuQixPQUFPLCtDQUErQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RSxDQUFDOzs7WUF0SEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLDJMQUE4QztnQkFFOUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBYlEsWUFBWTs7OzRCQWVsQixTQUFTLFNBQUMsUUFBUTtrQkFDbEIsS0FBSzt1QkFDTCxLQUFLO29CQUNMLEtBQUs7cUJBQ0wsS0FBSzttQkFDTCxLQUFLOzs7O0lBTE4sK0NBQStDOztJQUMvQyxxQ0FBNEI7O0lBQzVCLDBDQUFrQzs7SUFDbEMsdUNBQThCOztJQUM5Qix3Q0FBK0I7O0lBQy9CLHNDQUE2Qjs7Ozs7O0lBd0I3QixzQ0FRRTs7Ozs7SUE5QlUsMkNBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmNvbnN0IHByb3RvY29sID0gJ2h0dHBzOi8vJztcbmNvbnN0IGJhc2VXZWJVcmwgPSAnaHR0cHM6Ly93d3cucnVtYmxldGFsay5jb20vJztcbmNvbnN0IHNlcnZpY2VSZWxhdGl2ZVVybCA9ICdjbGllbnQvc2VydmljZS5waHA/aGFzaD0nO1xubGV0IHNlcnZlciA9ICdzdGFnZ2luZzUucnVtYmxldGFsay5uZXQ6NDQzMyc7XG5sZXQgbWVzc2FnZUludGVydmFsOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1ydW1ibGV0YWxrJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1ydW1ibGV0YWxrLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hSdW1ibGV0YWxrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnaWZyYW1lJykgaWZyYW1lRWxlbWVudDogRWxlbWVudFJlZjtcbiAgQElucHV0KCkgcHVibGljIHNyYzogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZmxvYXRpbmc6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHB1YmxpYyB3aWR0aDogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgaGVpZ2h0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoYXNoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICBnZXQgc2FmZVNyYygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodGhpcy5zcmMpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5hZGRMaXN0ZW5lcnMoKTtcbiAgICB0aGlzLmluc3RhbnRpYXRlUXVlcnkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgdGhlIGV2ZW50IGxpc3RlbmVycyBiYXNlZCBvbiB0aGUgZW1iZWQgdHlwZSBhbmQgZGV2aWNlXG4gICAqL1xuICBhZGRMaXN0ZW5lcnMoKTogdm9pZCB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLmluZm8sIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVzIHBvc3RNZXNzYWdlIHJlcXVlc3RzXG4gICAqIEBwYXJhbSBldmVudCAtIHRoZSBldmVudCBvYmplY3RcbiAgICovXG4gIGluZm8gPSBldmVudCA9PiB7XG4gICAgaWYgKGlzRmluaXRlKGV2ZW50LmRhdGEpKSB7XG4gICAgICBjbGVhckludGVydmFsKG1lc3NhZ2VJbnRlcnZhbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXZlbnQuZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChldmVudC5kYXRhLnJlbG9hZCkge1xuICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogcmVsb2FkcyB0aGUgaWZyYW1lIChvciBwYXJlbnQgcGFnZSkgaW4gY2FzZSBvZiBhIHNlcnZlciByZXF1ZXN0XG4gICAqL1xuICByZWxvYWQoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICB4aHIub3BlbignR0VUJywgYmFzZVdlYlVybCArIHNlcnZpY2VSZWxhdGl2ZVVybCArIHRoaXMuaGFzaCwgdHJ1ZSk7XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICBzZXJ2ZXIgPSByZXNwb25zZS5hZGRyZXNzO1xuICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSBwcm90b2NvbCArIHNlcnZlciArICcvJyArIHRoaXMuaGFzaCArICcvJztcblxuICAgICAgICAgIGlmICh0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudC5zcmMgPSBhZGRyZXNzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudC5sb2NhdGlvbi5ocmVmID0gYWRkcmVzcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmluc3RhbnRpYXRlUXVlcnkoKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyLnNlbmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdGFydHMgW3JlcGVhdGVkbHldIHRyeWluZyB0byBjb25uZWN0IHRvIHRoZSBjaGF0IHVzaW5nIHBvc3RNZXNzYWdlXG4gICAqL1xuICBpbnN0YW50aWF0ZVF1ZXJ5KCkge1xuICAgIG1lc3NhZ2VJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMucXVlcnkoKTtcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbnN0YW50aWF0ZSBhIHBvc3RNZXNzYWdlIGNvbm5lY3Rpb24gd2l0aCB0aGUgY2hhdFxuICAgKi9cbiAgcXVlcnkoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB0YXJnZXQ7XG4gICAgICBsZXQgb3JpZ2luO1xuXG4gICAgICBpZiAodGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0YXJnZXQgPSB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudC5jb250ZW50V2luZG93O1xuICAgICAgICBvcmlnaW4gPSBwcm90b2NvbCArIHNlcnZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBvcmlnaW4gPSBiYXNlV2ViVXJsO1xuICAgICAgfVxuXG4gICAgICB0YXJnZXQucG9zdE1lc3NhZ2UoJ3Rvb2xiYXInLCBvcmlnaW4pO1xuICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVja3MgaWYgdGhlIGdpdmVuIG9yaWdpbiBpcyBvZiBhIGNoYXQgc2VydmljZVxuICAgKiBAcGFyYW0gb3JpZ2luIC0gdGhlIFVSTCBvZiB0aGUgb3JpZ2luXG4gICAqIHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgdmFsaWRhdGVPcmlnaW4ob3JpZ2luKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eaHR0cHM6XFwvXFwvLitcXC5ydW1ibGV0YWxrXFwuKG5ldHxjb20pKDo0NDMzKT8kLy50ZXN0KG9yaWdpbik7XG4gIH1cbn1cbiJdfQ==