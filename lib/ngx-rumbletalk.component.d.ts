import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NgxRumbletalkService } from './ngx-rumbletalk.service';
export declare class NgxRumbletalkComponent implements OnInit, OnDestroy {
    private service;
    /** @const Object different embedding types */
    readonly EMBED_TYPES: {
        EMBEDDED: number;
        FLOATING: number;
        MOBILE_FULL: number;
    };
    readonly counterTop = 14;
    readonly counterLeft = 23;
    iframeElement: ElementRef;
    chatDivElement: ElementRef;
    hash: string;
    side: number;
    embedType: number;
    cdn: string;
    floating: boolean;
    width: number;
    height: number;
    bounce: number;
    image: string;
    showDetails: boolean;
    mobile: boolean;
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
    handleImageLoad(event: any): void;
    /**
     * hides or shows the floating chat
     * @param boolean [close] - if set to true, will force hide
     */
    toggleFloatingChatStart(close?: boolean): void;
    /**
     * hide or display the floating chat by @steps
     * @param number steps - the number of pixels to increment the display by
     */
    toggleFloatingChat(steps: any): void;
    /**
     * attaches the open chat event to the given target
     * @param Element target
     */
    openChat(): void;
}
