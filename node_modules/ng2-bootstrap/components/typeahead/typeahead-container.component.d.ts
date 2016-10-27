import { ElementRef, TemplateRef } from '@angular/core';
import { TypeaheadOptions } from './typeahead-options.class';
import { TypeaheadDirective } from './typeahead.directive';
export declare class TypeaheadContainerComponent {
    parent: TypeaheadDirective;
    query: any;
    element: ElementRef;
    isFocused: boolean;
    private _active;
    private _matches;
    private _field;
    private top;
    private left;
    private display;
    private placement;
    constructor(element: ElementRef, options: TypeaheadOptions);
    matches: Array<any>;
    readonly itemTemplate: TemplateRef<any>;
    field: string;
    position(hostEl: ElementRef): void;
    selectActiveMatch(): void;
    prevActiveMatch(): void;
    nextActiveMatch(): void;
    protected selectActive(value: any): void;
    protected hightlight(item: any, query: any): string;
    protected focusLost(): void;
    isActive(value: any): boolean;
    private selectMatch(value, e?);
}
