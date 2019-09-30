import { NgxRumbletalkService } from './ngx-rumbletalk.service';
import { OnInit, OnDestroy, ElementRef } from '@angular/core';
export declare class NgxRumbletalkComponent implements OnInit, OnDestroy {
    private service;
    iframeElement: ElementRef;
    floating: boolean;
    width: string;
    height: string;
    hash: string;
    constructor(service: NgxRumbletalkService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * add the event listeners based on the embed type and device
     */
    addListeners(): void;
    /**
     * handles postMessage requests
     * @param event - the event object
     */
    info(event: any): void;
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
