import { ViewContainerRef } from '@angular/core';
export interface KeyAttribute {
    [key: string]: any;
}
export declare class NgTranscludeDirective {
    private _viewRef;
    viewRef: ViewContainerRef;
    private _ngTransclude;
    private ngTransclude;
    constructor(_viewRef: ViewContainerRef);
}
