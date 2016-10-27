/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.15.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
import { NgZone } from '@angular/core';
import { SebmGoogleMapInfoWindow } from '../../directives/google-map-info-window';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { InfoWindowOptions } from '../google-maps-types';
import { MarkerManager } from './marker-manager';
export declare class InfoWindowManager {
    private _mapsWrapper;
    private _zone;
    private _markerManager;
    private _infoWindows;
    constructor(_mapsWrapper: GoogleMapsAPIWrapper, _zone: NgZone, _markerManager: MarkerManager);
    deleteInfoWindow(infoWindow: SebmGoogleMapInfoWindow): Promise<void>;
    setPosition(infoWindow: SebmGoogleMapInfoWindow): Promise<void>;
    setZIndex(infoWindow: SebmGoogleMapInfoWindow): Promise<void>;
    open(infoWindow: SebmGoogleMapInfoWindow): Promise<void>;
    close(infoWindow: SebmGoogleMapInfoWindow): Promise<void>;
    setOptions(infoWindow: SebmGoogleMapInfoWindow, options: InfoWindowOptions): Promise<void>;
    addInfoWindow(infoWindow: SebmGoogleMapInfoWindow): void;
}
