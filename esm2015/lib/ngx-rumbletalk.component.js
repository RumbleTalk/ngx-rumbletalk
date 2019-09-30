/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgxRumbletalkService } from './ngx-rumbletalk.service';
import { Component, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
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
export class NgxRumbletalkComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXJ1bWJsZXRhbGsvIiwic291cmNlcyI6WyJsaWIvbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQ0wsU0FBUyxFQUdULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDWCxNQUFNLGVBQWUsQ0FBQzs7TUFFakIsUUFBUSxHQUFHLFVBQVU7O01BQ3JCLFVBQVUsR0FBRyw2QkFBNkI7O01BQzFDLGtCQUFrQixHQUFHLDBCQUEwQjs7SUFDakQsTUFBTTs7SUFDTixlQUFvQjtBQVF4QixNQUFNLE9BQU8sc0JBQXNCOzs7O0lBT2pDLFlBQW9CLE9BQTZCO1FBQTdCLFlBQU8sR0FBUCxPQUFPLENBQXNCO0lBQUcsQ0FBQzs7OztJQUVyRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNsRCxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxXQUFXLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDMUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFLRCxZQUFZO1FBQ1YsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElB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eC1ydW1ibGV0YWxrLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmNvbnN0IHByb3RvY29sID0gJ2h0dHBzOi8vJztcbmNvbnN0IGJhc2VXZWJVcmwgPSAnaHR0cHM6Ly93d3cucnVtYmxldGFsay5jb20vJztcbmNvbnN0IHNlcnZpY2VSZWxhdGl2ZVVybCA9ICdjbGllbnQvc2VydmljZS5waHA/aGFzaD0nO1xubGV0IHNlcnZlcjtcbmxldCBtZXNzYWdlSW50ZXJ2YWw6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXJ1bWJsZXRhbGsnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LXJ1bWJsZXRhbGsuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtcnVtYmxldGFsay5jb21wb25lbnQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neFJ1bWJsZXRhbGtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2lmcmFtZScpIGlmcmFtZUVsZW1lbnQ6IEVsZW1lbnRSZWY7XG4gIEBJbnB1dCgpIHB1YmxpYyBmbG9hdGluZzogYm9vbGVhbjtcbiAgQElucHV0KCkgcHVibGljIHdpZHRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoZWlnaHQ6IHN0cmluZztcbiAgQElucHV0KCkgcHVibGljIGhhc2g6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnZpY2U6IE5neFJ1bWJsZXRhbGtTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2VydmljZS5hZGRyZXNzKHRoaXMuaGFzaCkuc3Vic2NyaWJlKGFkZHJlc3MgPT4ge1xuICAgICAgc2VydmVyID0gYWRkcmVzcztcbiAgICAgIHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50LnNyYyA9IGBodHRwczovLyR7YWRkcmVzc30vJHt0aGlzLmhhc2h9L2A7XG4gICAgICB0aGlzLmFkZExpc3RlbmVycygpO1xuICAgICAgdGhpcy5pbnN0YW50aWF0ZVF1ZXJ5KCk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjbGVhckludGVydmFsKG1lc3NhZ2VJbnRlcnZhbCk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIHRoZSBldmVudCBsaXN0ZW5lcnMgYmFzZWQgb24gdGhlIGVtYmVkIHR5cGUgYW5kIGRldmljZVxuICAgKi9cbiAgYWRkTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgdGhpcy5pbmZvLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoYW5kbGVzIHBvc3RNZXNzYWdlIHJlcXVlc3RzXG4gICAqIEBwYXJhbSBldmVudCAtIHRoZSBldmVudCBvYmplY3RcbiAgICovXG4gIGluZm8oZXZlbnQpIHtcbiAgICBpZiAoaXNGaW5pdGUoZXZlbnQuZGF0YSkpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwobWVzc2FnZUludGVydmFsKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBldmVudC5kYXRhID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKGV2ZW50LmRhdGEucmVsb2FkKSB7XG4gICAgICAgIHRoaXMucmVsb2FkKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHJlbG9hZHMgdGhlIGlmcmFtZSAob3IgcGFyZW50IHBhZ2UpIGluIGNhc2Ugb2YgYSBzZXJ2ZXIgcmVxdWVzdFxuICAgKi9cbiAgcmVsb2FkKCkge1xuICAgIGNvbnN0IHVybCA9IGAke2Jhc2VXZWJVcmx9JHtzZXJ2aWNlUmVsYXRpdmVVcmx9JHt0aGlzLmhhc2h9YDtcblxuICAgIHRoaXMuc2VydmljZS5yZWxvYWQodXJsKS5zdWJzY3JpYmUoXG4gICAgICByZXMgPT4ge1xuICAgICAgICBpZiAocmVzLnN0YXR1cykge1xuICAgICAgICAgIHNlcnZlciA9IHJlcy5hZGRyZXNzO1xuICAgICAgICAgIGNvbnN0IGFkZHJlc3MgPSBgJHtwcm90b2NvbH0ke3NlcnZlcn0vJHt0aGlzLmhhc2h9L2A7XG5cbiAgICAgICAgICBpZiAodGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3JjID0gYWRkcmVzcztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQubG9jYXRpb24uaHJlZiA9IGFkZHJlc3M7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5pbnN0YW50aWF0ZVF1ZXJ5KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBpZ25vcmUgPT4gbG9jYXRpb24ucmVsb2FkKClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXJ0cyBbcmVwZWF0ZWRseV0gdHJ5aW5nIHRvIGNvbm5lY3QgdG8gdGhlIGNoYXQgdXNpbmcgcG9zdE1lc3NhZ2VcbiAgICovXG4gIGluc3RhbnRpYXRlUXVlcnkoKSB7XG4gICAgbWVzc2FnZUludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5xdWVyeS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBpbnN0YW50aWF0ZSBhIHBvc3RNZXNzYWdlIGNvbm5lY3Rpb24gd2l0aCB0aGUgY2hhdFxuICAgKi9cbiAgcXVlcnkoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB0YXJnZXQ7XG4gICAgICBsZXQgb3JpZ2luO1xuXG4gICAgICBpZiAodGhpcy5pZnJhbWVFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgICB0YXJnZXQgPSB0aGlzLmlmcmFtZUVsZW1lbnQubmF0aXZlRWxlbWVudC5jb250ZW50V2luZG93O1xuICAgICAgICBvcmlnaW4gPSBwcm90b2NvbCArIHNlcnZlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IHRoaXMuaWZyYW1lRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgICBvcmlnaW4gPSBiYXNlV2ViVXJsO1xuICAgICAgfVxuXG4gICAgICB0YXJnZXQucG9zdE1lc3NhZ2UoJ3Rvb2xiYXInLCBvcmlnaW4pO1xuICAgIH0gY2F0Y2ggKGlnbm9yZSkge31cbiAgfVxuXG4gIC8qKlxuICAgKiBjaGVja3MgaWYgdGhlIGdpdmVuIG9yaWdpbiBpcyBvZiBhIGNoYXQgc2VydmljZVxuICAgKiBAcGFyYW0gb3JpZ2luIC0gdGhlIFVSTCBvZiB0aGUgb3JpZ2luXG4gICAqIHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgdmFsaWRhdGVPcmlnaW4ob3JpZ2luKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC9eaHR0cHM6XFwvXFwvLitcXC5ydW1ibGV0YWxrXFwuKG5ldHxjb20pKDo0NDMzKT8kLy50ZXN0KG9yaWdpbik7XG4gIH1cbn1cbiJdfQ==