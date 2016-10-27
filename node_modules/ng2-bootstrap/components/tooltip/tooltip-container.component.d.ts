import { AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { TooltipOptions } from './tooltip-options.class';
export declare class TooltipContainerComponent implements AfterViewInit {
    private classMap;
    private top;
    private left;
    private display;
    private content;
    private htmlContent;
    private placement;
    private popupClass;
    private animation;
    private isOpen;
    private appendToBody;
    private hostEl;
    private context;
    private element;
    private cdr;
    constructor(element: ElementRef, cdr: ChangeDetectorRef, options: TooltipOptions);
    ngAfterViewInit(): void;
    readonly isTemplate: boolean;
}
