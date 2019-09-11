import { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class NgxRumbletalkComponent implements OnInit {
    private sanitizer;
    src: string;
    floating: boolean;
    width: string;
    height: string;
    constructor(sanitizer: DomSanitizer);
    readonly safeSrc: any;
    ngOnInit(): void;
}
