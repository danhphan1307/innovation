/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.15.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT_GLOBAL, WINDOW_GLOBAL } from '../../utils/browser-globals';
import { MapsAPILoader } from './maps-api-loader';
export var GoogleMapsScriptProtocol;
(function (GoogleMapsScriptProtocol) {
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTP"] = 1] = "HTTP";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["HTTPS"] = 2] = "HTTPS";
    GoogleMapsScriptProtocol[GoogleMapsScriptProtocol["AUTO"] = 3] = "AUTO";
})(GoogleMapsScriptProtocol || (GoogleMapsScriptProtocol = {}));
/**
 * Configuration for {@link LazyMapsAPILoader}.
 * See {@link LazyMapsAPILoaderConfig} for instance attribute descriptions.
 */
export class LazyMapsAPILoaderConfig {
    constructor() {
        this.apiKey = null;
        this.clientId = null;
        this.channel = null;
        this.apiVersion = '3';
        this.hostAndPath = 'maps.googleapis.com/maps/api/js';
        this.protocol = GoogleMapsScriptProtocol.HTTPS;
        this.libraries = [];
        this.region = null;
        this.language = null;
    }
}
const DEFAULT_CONFIGURATION = new LazyMapsAPILoaderConfig();
export let LazyMapsAPILoader = class LazyMapsAPILoader extends MapsAPILoader {
    constructor(config, w, d) {
        super();
        this._config = config || DEFAULT_CONFIGURATION;
        this._window = w;
        this._document = d;
    }
    load() {
        if (this._scriptLoadingPromise) {
            return this._scriptLoadingPromise;
        }
        const script = this._document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        const callbackName = `angular2GoogleMapsLazyMapsAPILoader`;
        script.src = this._getScriptSrc(callbackName);
        this._scriptLoadingPromise = new Promise((resolve, reject) => {
            this._window[callbackName] = () => { resolve(); };
            script.onerror = (error) => { reject(error); };
        });
        this._document.body.appendChild(script);
        return this._scriptLoadingPromise;
    }
    _getScriptSrc(callbackName) {
        let protocolType = (this._config && this._config.protocol) || DEFAULT_CONFIGURATION.protocol;
        let protocol;
        switch (protocolType) {
            case GoogleMapsScriptProtocol.AUTO:
                protocol = '';
                break;
            case GoogleMapsScriptProtocol.HTTP:
                protocol = 'http:';
                break;
            case GoogleMapsScriptProtocol.HTTPS:
                protocol = 'https:';
                break;
        }
        const hostAndPath = this._config.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
        const queryParams = {
            v: this._config.apiVersion || DEFAULT_CONFIGURATION.apiVersion,
            callback: callbackName,
            key: this._config.apiKey,
            client: this._config.clientId,
            channel: this._config.channel,
            libraries: this._config.libraries,
            region: this._config.region,
            language: this._config.language
        };
        const params = Object.keys(queryParams)
            .filter((k) => queryParams[k] != null)
            .filter((k) => {
            // remove empty arrays
            return !Array.isArray(queryParams[k]) ||
                (Array.isArray(queryParams[k]) && queryParams[k].length > 0);
        })
            .map((k) => {
            // join arrays as comma seperated strings
            let i = queryParams[k];
            if (Array.isArray(i)) {
                return { key: k, value: i.join(',') };
            }
            return { key: k, value: queryParams[k] };
        })
            .map((entry) => { return `${entry.key}=${entry.value}`; })
            .join('&');
        return `${protocol}//${hostAndPath}?${params}`;
    }
};
LazyMapsAPILoader = __decorate([
    Injectable(),
    __param(0, Optional()),
    __param(1, Inject(WINDOW_GLOBAL)),
    __param(2, Inject(DOCUMENT_GLOBAL)), 
    __metadata('design:paramtypes', [LazyMapsAPILoaderConfig, Window, Document])
], LazyMapsAPILoader);
/**
 * Creates a provider for a {@link LazyMapsAPILoaderConfig})
 */
export function provideLazyMapsAPILoaderConfig(confLiteral) {
    return {
        provide: LazyMapsAPILoaderConfig,
        useFactory: () => {
            const config = new LazyMapsAPILoaderConfig();
            // todo(sebastian): deprecate LazyMapsAPILoader class
            config.apiKey = confLiteral.apiKey || DEFAULT_CONFIGURATION.apiKey;
            config.apiVersion = confLiteral.apiVersion || DEFAULT_CONFIGURATION.apiVersion;
            config.channel = confLiteral.channel || DEFAULT_CONFIGURATION.channel;
            config.clientId = confLiteral.clientId || DEFAULT_CONFIGURATION.clientId;
            config.hostAndPath = confLiteral.hostAndPath || DEFAULT_CONFIGURATION.hostAndPath;
            config.language = confLiteral.language || DEFAULT_CONFIGURATION.language;
            config.libraries = confLiteral.libraries || DEFAULT_CONFIGURATION.libraries;
            config.protocol = config.protocol || DEFAULT_CONFIGURATION.protocol;
            config.region = config.region || DEFAULT_CONFIGURATION.region;
            return config;
        }
    };
}

//# sourceMappingURL=lazy-maps-api-loader.js.map
