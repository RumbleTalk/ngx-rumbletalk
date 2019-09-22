import { OnInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class NgxRumbletalkComponent implements OnInit {
    private sanitizer;
    iframeElement: ElementRef;
    src: string;
    floating: boolean;
    width: string;
    height: string;
    hash: string;
    constructor(sanitizer: DomSanitizer);
    readonly safeSrc: any;
    ngOnInit(): void;
    /**
     * add the event listeners based on the embed type and device
     */
    addListeners(): void;
    /**
     * handles postMessage requests
     * @param event - the event object
     */
    info: (event: any) => void;
    /**
     * reloads the iframe (or parent page) in case of a server request
     */
    reload(): void;
    /**
     * starts [repeatedly] trying to connect to the chat using postMessage
     */
    instantiateQuery(): void;
    /**
     * instantiate a postMessage connection with the chat
     */
    query(): void;
    /**
     * checks if the given origin is of a chat service
     * @param origin - the URL of the origin
     * returns boolean
     */
    validateOrigin(origin: any): boolean;
}
