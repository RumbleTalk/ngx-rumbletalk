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
const server = 'stagging5.rumbletalk.net:4433';
/** @type {?} */
var messageInterval;
export class NgxRumbletalkComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
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
                    /** @type {?} */
                    const tempServer = response.address;
                    /** @type {?} */
                    const address = protocol + tempServer + '/' + this.hash + '/';
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
     * @type {?}
     * @private
     */
    NgxRumbletalkComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJ1bWJsZXRhbGsvIiwic291cmNlcyI6WyJsaWIvbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O01BRW5ELFFBQVEsR0FBRyxVQUFVOztNQUNyQixVQUFVLEdBQUcsNkJBQTZCOztNQUMxQyxrQkFBa0IsR0FBRywwQkFBMEI7O01BQy9DLE1BQU0sR0FBRywrQkFBK0I7O0lBQzFDLGVBQW9CO0FBUXhCLE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFRakMsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7Ozs7SUFFL0MsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqRSxDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs7OztJQUtELFlBQVk7UUFDVixNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Ozs7OztJQU1ELElBQUksQ0FBQyxLQUFLO1FBQ1IsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hCLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQUksT0FB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bnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmNvbnN0IHByb3RvY29sID0gJ2h0dHBzOi8vJztcbmNvbnN0IGJhc2VXZWJVcmwgPSAnaHR0cHM6Ly93d3cucnVtYmxldGFsay5jb20vJztcbmNvbnN0IHNlcnZpY2VSZWxhdGl2ZVVybCA9ICdjbGllbnQvc2VydmljZS5waHA/aGFzaD0nO1xuY29uc3Qgc2VydmVyID0gJ3N0YWdnaW5nNS5ydW1ibGV0YWxrLm5ldDo0NDMzJztcbnZhciBtZXNzYWdlSW50ZXJ2YWw6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXJ1bWJsZXRhbGsnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtcnVtYmxldGFsay5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neFJ1bWJsZXRhbGtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKCdpZnJhbWUnKSBpZnJhbWVFbGVtZW50OiBFbGVtZW50UmVmO1xuICBASW5wdXQoKSBwdWJsaWMgc3JjOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBmbG9hdGluZzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIHdpZHRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoZWlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGhhc2g6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIGdldCBzYWZlU3JjKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh0aGlzLnNyYyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgIHRoaXMuaW5zdGFudGlhdGVRdWVyeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCB0aGUgZXZlbnQgbGlzdGVuZXJzIGJhc2VkIG9uIHRoZSBlbWJlZCB0eXBlIGFuZCBkZXZpY2VcbiAgICovXG4gIGFkZExpc3RlbmVycygpOiB2b2lkIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuaW5mby5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogaGFuZGxlcyBwb3N0TWVzc2FnZSByZXF1ZXN0c1xuICAgKiBAcGFyYW0gZXZlbnQgLSB0aGUgZXZlbnQgb2JqZWN0XG4gICAqL1xuICBpbmZvKGV2ZW50KSB7XG4gICAgaWYgKGlzRmluaXRlKGV2ZW50LmRhdGEpKSB7XG4gICAgICBjbGVhckludGVydmFsKG1lc3NhZ2VJbnRlcnZhbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXZlbnQuZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChldmVudC5kYXRhLnJlbG9hZCkge1xuICAgICAgICB0aGlzLnJlbG9hZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiByZWxvYWRzIHRoZSBpZnJhbWUgKG9yIHBhcmVudCBwYWdlKSBpbiBjYXNlIG9mIGEgc2VydmVyIHJlcXVlc3RcbiAgICovXG4gIHJlbG9hZCgpIHtcbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHhoci5vcGVuKCdHRVQnLCBiYXNlV2ViVXJsICsgc2VydmljZVJlbGF0aXZlVXJsICsgdGhpcy5oYXNoLCB0cnVlKTtcblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cykge1xuICAgICAgICAgIGNvbnN0IHRlbXBTZXJ2ZXIgPSByZXNwb25zZS5hZGRyZXNzO1xuICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSBwcm90b2NvbCArIHRlbXBTZXJ2ZXIgKyAnLycgKyB0aGlzLmhhc2ggKyAnLyc7XG5cbiAgICAgICAgICBpZiAodGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3JjID0gYWRkcmVzcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQubG9jYXRpb24uaHJlZiA9IGFkZHJlc3M7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVF1ZXJ5KCk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHhoci5zZW5kKCk7XG4gIH1cblxuICAvKipcbiAgICogc3RhcnRzIFtyZXBlYXRlZGx5XSB0cnlpbmcgdG8gY29ubmVjdCB0byB0aGUgY2hhdCB1c2luZyBwb3N0TWVzc2FnZVxuICAgKi9cbiAgaW5zdGFudGlhdGVRdWVyeSgpIHtcbiAgICBtZXNzYWdlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnF1ZXJ5LmJpbmQodGhpcyksIDEwMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIGluc3RhbnRpYXRlIGEgcG9zdE1lc3NhZ2UgY29ubmVjdGlvbiB3aXRoIHRoZSBjaGF0XG4gICAqL1xuICBxdWVyeSgpIHtcbiAgICB0cnkge1xuICAgICAgbGV0IHRhcmdldDtcbiAgICAgIGxldCBvcmlnaW47XG5cbiAgICAgIGlmICh0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICAgIHRhcmdldCA9IHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRlbnRXaW5kb3c7XG4gICAgICAgIG9yaWdpbiA9IHByb3RvY29sICsgc2VydmVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIG9yaWdpbiA9IGJhc2VXZWJVcmw7XG4gICAgICB9XG5cbiAgICAgIHRhcmdldC5wb3N0TWVzc2FnZSgndG9vbGJhcicsIG9yaWdpbik7XG4gICAgfSBjYXRjaCAoaWdub3JlKSB7fVxuICB9XG5cbiAgLyoqXG4gICAqIGNoZWNrcyBpZiB0aGUgZ2l2ZW4gb3JpZ2luIGlzIG9mIGEgY2hhdCBzZXJ2aWNlXG4gICAqIEBwYXJhbSBvcmlnaW4gLSB0aGUgVVJMIG9mIHRoZSBvcmlnaW5cbiAgICogcmV0dXJucyBib29sZWFuXG4gICAqL1xuICB2YWxpZGF0ZU9yaWdpbihvcmlnaW4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gL15odHRwczpcXC9cXC8uK1xcLnJ1bWJsZXRhbGtcXC4obmV0fGNvbSkoOjQ0MzMpPyQvLnRlc3Qob3JpZ2luKTtcbiAgfVxufVxuIl19